"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { editorial, ease, lineRise, media, refreshPriority, type MediaConditions } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";
import { columnStep, playOnce, scrubTimeline, splitLines } from "@/lib/reveal";

type Share = readonly [number, number];

/**
 * The Editorial statement's section, with its motion (MOTION.md §4.3)
 * around the static content Editorial renders. On desktop one scrubbed
 * timeline reveals line 1, then line 2, settles the pair from 0.97 while
 * line 2 slides in from one column to the right, and brings the supporting
 * line last. On mobile the statement rises once when it reaches the screen,
 * and the supporting line when it does.
 */
export function EditorialMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const [pair] = q("[data-pair]");
      const [supporting] = q("[data-supporting]");
      const mm = gsap.matchMedia();

      mm.add(media, (context) => {
        const { desktop, mobile } = context.conditions as MediaConditions;

        if (desktop) {
          const { scrub } = editorial;
          splitLines([pair, supporting], (split) => {
            // A line belongs to line 1, line 2 or the supporting line by
            // what it holds: the split keeps the pair's two spans.
            const linesOf = (part: string) => split.lines.filter((line) => line.querySelector(part));
            const lineOne = linesOf('[data-line="1"]');
            const lineTwo = linesOf('[data-line="2"]');
            const supportingLines = split.lines.filter((line) => supporting.contains(line));
            const slide = q('[data-line="2"]');
            const rise = (timeline: gsap.core.Timeline, lines: Element[], [from, to]: Share) =>
              timeline.fromTo(lines, { yPercent: lineRise.fromYPercent }, { yPercent: 0, duration: to - from }, from);

            return scrubTimeline({
              trigger: section,
              section,
              start: scrub.start,
              end: scrub.end,
              refreshPriority: refreshPriority.editorial,
              invalidateOnRefresh: true, // the slide measures a column
              build: (timeline) => {
                rise(timeline, lineOne, scrub.lineOne);
                rise(timeline, lineTwo, scrub.lineTwo);
                const [settleFrom, settleTo] = scrub.settle;
                timeline.fromTo(
                  pair,
                  { scale: scrub.fromScale, transformOrigin: "left center" },
                  { scale: 1, duration: settleTo - settleFrom },
                  settleFrom,
                );
                const [slideFrom, slideTo] = scrub.slide;
                timeline.fromTo(
                  slide,
                  { x: () => columnStep(section) },
                  { x: 0, duration: slideTo - slideFrom },
                  slideFrom,
                );
                rise(timeline, supportingLines, scrub.supporting);
              },
              rest: () => {
                gsap.set([...split.lines, ...slide], { clearProps: "transform" });
                gsap.set(pair, { clearProps: "transform,transformOrigin" });
              },
            });
          });
        }

        if (mobile) {
          const { once } = editorial;
          const cleanups = [pair, supporting].map((text) =>
            playOnce({
              text,
              trigger: text,
              start: once.start,
              refreshPriority: refreshPriority.editorial,
              section,
              build: (timeline, split) =>
                timeline.fromTo(
                  split.lines,
                  { yPercent: lineRise.fromYPercent },
                  { yPercent: 0, duration: once.duration, stagger: once.stagger, ease: ease.out },
                ),
            }),
          );
          return () => cleanups.forEach((cleanup) => cleanup());
        }
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
