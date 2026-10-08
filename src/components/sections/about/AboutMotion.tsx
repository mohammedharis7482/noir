"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { about, ease, lineRise, motionAllowed, refreshPriority } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";
import { playOnce, scrubTimeline } from "@/lib/reveal";

/**
 * About's section, with its motion (MOTION.md §4.4) around the static
 * content About renders, at every width. The paragraph's lines rise once,
 * shorter and quicker than the statements, because this is reading text;
 * the portrait drifts across the section on its inner layer, which
 * globals.css oversizes so the frame never shows an empty edge. The facts
 * list doesn't move.
 */
export function AboutMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const [paragraph] = q("[data-lines]");
      const drift = q("[data-noir-drift]");
      const mm = gsap.matchMedia();

      mm.add(motionAllowed, () => {
        const { range, start, end } = about.drift;
        scrubTimeline({
          trigger: section,
          start,
          end,
          refreshPriority: refreshPriority.about,
          build: (timeline) => timeline.fromTo(drift, { yPercent: -range }, { yPercent: range, duration: 1 }),
        });

        const { lines } = about;
        return playOnce({
          text: paragraph,
          trigger: section,
          start: lines.start,
          refreshPriority: refreshPriority.about,
          section,
          build: (timeline, split) =>
            timeline.fromTo(
              split.lines,
              { yPercent: lineRise.fromYPercent },
              { yPercent: 0, duration: lines.duration, stagger: lines.stagger, ease: ease.out },
            ),
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
