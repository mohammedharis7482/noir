"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ease, marquee, motionAllowed, refreshPriority } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";

/**
 * The marquee's section, with its constant drift (MOTION.md §4.5) around
 * the static line Marquee renders. The track holds the line twice (the
 * second copy shows only in motion mode and is aria-hidden), so moving it
 * left by half its width is one seamless loop. It plays while the marquee
 * is on screen and pauses when it isn't. Under reduced motion it is one
 * still line.
 */
export function MarqueeMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const [track] = gsap.utils.selector(section)("[data-marquee-track]");
      const mm = gsap.matchMedia();

      mm.add(motionAllowed, () => {
        // A to() tween writes nothing until it first plays, so the line
        // rests exactly as on the static page until it is on screen.
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: marquee.loop,
          ease: ease.linear,
          repeat: -1,
          paused: true,
        });
        ScrollTrigger.create({
          trigger: section,
          start: marquee.onScreen.start,
          end: marquee.onScreen.end,
          refreshPriority: refreshPriority.marquee,
          onToggle: ({ isActive }) => (isActive ? loop.play() : loop.pause()),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
