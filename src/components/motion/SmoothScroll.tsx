"use client";

import Lenis from "lenis";
import { createContext, useContext, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";

/** GSAP's default lag smoothing, restored whenever Lenis stops. */
const GSAP_LAG_THRESHOLD = 500;
const GSAP_ADJUSTED_LAG = 33;

const LenisContext = createContext<Lenis | null>(null);

/** Resolves when the window's load event has fired. */
function pageLoaded(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
}

/**
 * The app's Lenis instance, for scrollTo, stop and start. It is null under
 * reduced motion and during the server render; scroll natively then.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * One Lenis instance for the whole app. It smooths wheel input only, runs
 * on gsap.ticker so ScrollTrigger reads the same scroll position in the
 * same frame, and never exists under reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useGSAP(() => {
    // The app's motion has started, so the failsafe can stand down even on a
    // page without motion of its own (/credits): otherwise it would drop
    // data-motion there, and the home page reached from it without a reload
    // would stay static. Sections still claim for themselves first, as this
    // provider's effects run after theirs.
    claimMotion();
    const mm = gsap.matchMedia();

    mm.add(motionAllowed, () => {
      const instance = new Lenis({
        autoRaf: false, // gsap.ticker drives it below
        smoothWheel: true,
        syncTouch: false, // touch scrolling stays native
      });
      const raf = (time: number) => instance.raf(time * 1000);

      instance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);

      return () => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(GSAP_LAG_THRESHOLD, GSAP_ADJUSTED_LAG);
        instance.destroy();
        setLenis(null);
      };
    });

    // A full refresh measures every trigger from the top of the page, then
    // returns to the scroll position it recorded. But ScrollTrigger forgets
    // that position whenever the last trigger on the page is killed, and a
    // resize across 1024px does exactly that: the desktop triggers go, the
    // mobile ones come. Keep the reader's place (MOTION.md §10.4). This is
    // the one native scroll while Lenis runs: Lenis hasn't seen the refresh
    // jump to the top yet, so its scrollTo would think it is already there;
    // it follows the native scroll instead.
    let readerAt = 0;
    const record = () => {
      readerAt = window.scrollY;
    };
    const restore = () => {
      if (Math.abs(window.scrollY - readerAt) >= 1) window.scrollTo(0, readerAt);
    };
    ScrollTrigger.addEventListener("refreshInit", record);
    ScrollTrigger.addEventListener("refresh", restore);

    // MOTION.md §2.4: one refresh once every section has mounted (this
    // provider's effects run after its children's), the fonts are ready and
    // the page has loaded, which includes the eager, preloaded hero
    // photograph. Web fonts change line breaks after the first layout.
    Promise.all([document.fonts.ready, pageLoaded()]).then(() => ScrollTrigger.refresh());

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", record);
      ScrollTrigger.removeEventListener("refresh", restore);
    };
  });

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
