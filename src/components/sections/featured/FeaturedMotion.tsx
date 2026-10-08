"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, featured, media, refreshPriority, type MediaConditions } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";
import { repaint, scrubTimeline } from "@/lib/reveal";

/**
 * The Featured section, with its motion (MOTION.md §4.2) around the static
 * content Featured renders. The photograph's frame opens from its bottom
 * edge upward while the image inside settles from 1.15; the caption fades
 * in once the reveal is complete and out again if it reverses. On desktop
 * the image also drifts while it is on screen, on its own layer, which
 * globals.css oversizes so the frame never shows an empty edge.
 */
export function FeaturedMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const [frame] = q("[data-noir-frame]");
      const settle = q("[data-noir-inner]");
      const drift = q("[data-noir-drift]");
      const caption = q("figcaption");
      const mm = gsap.matchMedia();

      mm.add(media, (context) => {
        const { desktop, mobile } = context.conditions as MediaConditions;
        if (!desktop && !mobile) return;
        const { reveal } = featured;
        const range = desktop ? reveal.desktop : reveal.mobile;

        // The caption follows the reveal: shown at rest only once it is
        // complete. A refresh sets it at once; scrolling fades it.
        let captionShown = true;
        const showCaption = (shown: boolean, instantly: boolean) => {
          if (shown === captionShown) return;
          captionShown = shown;
          gsap.killTweensOf(caption);
          if (instantly) {
            gsap.set(caption, shown ? { clearProps: "opacity" } : { opacity: 0 });
          } else {
            gsap.to(caption, {
              opacity: shown ? 1 : 0,
              duration: featured.caption.duration,
              ease: ease.out,
              onComplete: () => {
                if (!shown) return;
                gsap.set(caption, { clearProps: "opacity" });
                repaint(section);
              },
            });
          }
        };

        const timeline = scrubTimeline({
          trigger: frame,
          section,
          start: range.start,
          end: range.end,
          refreshPriority: refreshPriority.featured,
          build: (timeline) =>
            timeline
              .fromTo(frame, { clipPath: reveal.fromClip }, { clipPath: reveal.toClip, duration: 1 }, 0)
              .fromTo(settle, { scale: reveal.fromScale }, { scale: 1, duration: 1 }, 0),
          rest: () => {
            gsap.set(frame, { clearProps: "clipPath" });
            gsap.set(settle, { clearProps: "transform" });
          },
          onJump: (progress) => showCaption(progress === 1, true),
        });
        timeline.eventCallback("onUpdate", () => showCaption(timeline.progress() === 1, false));

        if (desktop) {
          const { range: driftRange, start, end } = featured.drift;
          scrubTimeline({
            trigger: frame,
            start,
            end,
            refreshPriority: refreshPriority.featured,
            build: (timeline) =>
              timeline.fromTo(drift, { yPercent: -driftRange }, { yPercent: driftRange, duration: 1 }),
          });
        }

        return () => {
          gsap.killTweensOf(caption);
          gsap.set(caption, { clearProps: "opacity" });
        };
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
