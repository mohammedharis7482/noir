"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ease, media, type MediaConditions } from "@/lib/motion";

/**
 * Pins a stage for one viewport of scroll and scrubs a bar across it. On
 * every Lenis scroll event, after SmoothScroll has passed the event to
 * ScrollTrigger, the readout prints the scroll position each library holds.
 * In sync, the two numbers match for wheel, keyboard and touch scrolling,
 * and the pinned stage holds perfectly still.
 */
export function SyncTest() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(media, (context) => {
        const { reduced } = context.conditions as MediaConditions;
        // Reduced motion: no pin and no scrub; the bar keeps its final, full width.
        if (reduced) return;

        const tween = gsap.fromTo(
          bar.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: ease.linear,
            scrollTrigger: {
              trigger: stage.current,
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: true, // no smoothing: the bar must track the scroll exactly
            },
          },
        );
        trigger.current = tween.scrollTrigger ?? null;

        return () => {
          trigger.current = null;
        };
      });
    },
    { scope: root },
  );

  // Subscribed after SmoothScroll's own listener, so ScrollTrigger has
  // already updated for this scroll event when the readout is written.
  useEffect(() => {
    if (!lenis) return;

    return lenis.on("scroll", () => {
      if (!trigger.current || !readout.current) return;
      const scrollTrigger = Math.round(trigger.current.scroll());
      const smooth = Math.round(lenis.animatedScroll);
      readout.current.textContent = `ScrollTrigger ${scrollTrigger}px / Lenis ${smooth}px`;
    });
  }, [lenis]);

  return (
    <div ref={root} className="col-span-full">
      <div ref={stage} className="flex h-svh flex-col justify-center gap-6">
        <div ref={bar} className="h-1 origin-left bg-fg" />
        <p className="meta tabular-nums">
          <span ref={readout}>ScrollTrigger – / Lenis –</span>
        </p>
      </div>
    </div>
  );
}
