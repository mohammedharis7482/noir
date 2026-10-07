"use client";

import Lenis from "lenis";
import { createContext, useContext, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motion";

/** GSAP's default lag smoothing, restored whenever Lenis stops. */
const GSAP_LAG_THRESHOLD = 500;
const GSAP_ADJUSTED_LAG = 33;

const LenisContext = createContext<Lenis | null>(null);

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

    // Web fonts change line breaks after the first layout. Images are
    // covered already: ScrollTrigger refreshes on window load, which waits
    // for eager (above-the-fold) images, and NoirImage frames reserve their
    // space before a photograph arrives.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  });

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
