"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, intro, lineRise, media, refreshPriority, type MediaConditions } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";
import { playOnce, scrubTimeline, splitLines } from "@/lib/reveal";

/**
 * The Intro's section, with its motion (MOTION.md §4.1) around the static
 * content Intro renders. On desktop the statement's lines rise one after
 * another as the section scrolls up over the pinned hero, then the
 * metadata fades in; scrolling back takes them down again. On mobile the
 * lines rise once, then the metadata.
 */
export function IntroMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const [statement] = q("[data-lines]");
      const meta = q("[data-fade]");
      const mm = gsap.matchMedia();

      mm.add(media, (context) => {
        const { desktop, mobile } = context.conditions as MediaConditions;

        if (desktop) {
          const { scrub } = intro;
          splitLines(statement, (split) =>
            scrubTimeline({
              trigger: section,
              section,
              start: scrub.start,
              end: scrub.end,
              refreshPriority: refreshPriority.intro,
              build: (timeline) => {
                const [from, to] = scrub.lines;
                const share = (to - from) / split.lines.length;
                split.lines.forEach((line, index) =>
                  timeline.fromTo(
                    line,
                    { yPercent: lineRise.fromYPercent },
                    { yPercent: 0, duration: share },
                    from + index * share,
                  ),
                );
                const [metaFrom, metaTo] = scrub.meta;
                timeline.fromTo(meta, { opacity: 0 }, { opacity: 1, duration: metaTo - metaFrom }, metaFrom);
              },
              rest: () => gsap.set([...split.lines, ...meta], { clearProps: "transform,opacity" }),
            }),
          );
        }

        if (mobile) {
          const { once } = intro;
          return playOnce({
            text: statement,
            trigger: section,
            start: once.start,
            refreshPriority: refreshPriority.intro,
            section,
            build: (timeline, split) =>
              timeline
                .fromTo(
                  split.lines,
                  { yPercent: lineRise.fromYPercent },
                  { yPercent: 0, duration: once.lines.duration, stagger: once.lines.stagger, ease: ease.out },
                )
                .fromTo(meta, { opacity: 0 }, { opacity: 1, duration: once.meta.duration, ease: ease.out }),
          });
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
