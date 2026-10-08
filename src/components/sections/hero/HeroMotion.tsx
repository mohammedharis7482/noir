"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import {
  ease,
  hero,
  media,
  motionAllowed,
  refreshPriority,
  scrub,
  type MediaConditions,
} from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";

/** The load sequence plays once per document; coming back to the home page
 *  from /credits shows the hero at rest. */
let loadPlayed = false;

/**
 * The hero's section, with its motion (MOTION.md §3) around the static
 * content Hero renders. The load sequence starts from the hidden states in
 * globals.css and ends by removing every trace of itself, so the hero at
 * rest is exactly the Phase 2a layout (MOTION.md §0). On desktop the hero
 * then pins while the camera leans in; on mobile the photograph drifts as
 * the hero leaves the screen.
 */
export function HeroMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const frame = q("[data-noir-frame]");
      const settle = q("[data-noir-inner]");
      const push = q("[data-noir-nested]");
      const headline = q("h1");
      const fades = q("[data-hero-fade]");
      const mm = gsap.matchMedia();

      // The load sequence, on any width, so a resize across 1024px never
      // interrupts it. Turning on reduced motion reverts it to the static hero.
      mm.add(motionAllowed, () => {
        if (loadPlayed) {
          section.setAttribute("data-loaded", "");
          return;
        }
        const { load } = hero;
        const fadeItems = q("[data-hero-fade] > *");
        let cancelled = false;
        let photoDone = false;
        let headlineDone = false;
        let headlineDue = false;
        let fontsReady = false;
        let lines: gsap.core.Tween | undefined;

        gsap
          .timeline({
            onComplete: () => {
              photoDone = true;
              finish();
            },
          })
          .to(frame, { opacity: 1, duration: load.photo.duration, ease: ease.out }, load.photo.at)
          .to(settle, { scale: 1, duration: load.settle.duration, ease: ease.out }, load.settle.at)
          .to(fadeItems, { opacity: 1, duration: load.secondary.duration, ease: ease.out }, load.secondary.at);

        // The headline's lines wait, hidden in their masks, until it is due
        // and the fonts are ready, or until fontsBy at the latest. autoSplit
        // re-splits when the fonts arrive or the width changes; SplitText
        // carries the lines' progress over to the new split.
        const split = SplitText.create(headline, {
          type: "lines",
          mask: "lines",
          linesClass: "hero-line",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(headline, { visibility: "inherit" });
            lines = gsap.fromTo(
              self.lines,
              { yPercent: load.headline.fromYPercent },
              {
                yPercent: 0,
                duration: load.headline.duration,
                stagger: load.headline.stagger,
                ease: ease.out,
                // Write the hidden start now, in the same task as the split,
                // not lazily at GSAP's next tick: until then the new lines
                // would sit visible in place.
                lazy: false,
                paused: !(headlineDue && fontsReady),
                onComplete: () => {
                  headlineDone = true;
                  finish();
                },
              },
            );
            return lines;
          },
        });
        // At rest, when both parts are done: the split goes, inline styles
        // go, and data-loaded lifts the hidden states, so only the static
        // layout remains.
        const finish = () => {
          if (!photoDone || !headlineDone || section.hasAttribute("data-loaded")) return;
          split.revert();
          section.setAttribute("data-loaded", "");
          gsap.set(frame, { clearProps: "opacity" });
          gsap.set(settle, { clearProps: "transform" });
          gsap.set(fadeItems, { clearProps: "opacity" });
          gsap.set(headline, { clearProps: "visibility" });
          loadPlayed = true;
        };

        const startLines = () => {
          if (!cancelled) lines?.play();
        };
        gsap.delayedCall(load.headline.at, () => {
          headlineDue = true;
          if (fontsReady) startLines();
        });
        gsap.delayedCall(load.fontsBy, () => {
          headlineDue = fontsReady = true;
          startLines();
        });
        document.fonts.ready.then(() => {
          fontsReady = true;
          if (headlineDue) startLines();
        });

        return () => {
          cancelled = true;
        };
      });

      // The scroll: the camera leans in on desktop (MOTION.md §3.2); the
      // photograph drifts on mobile (§3.3). Nothing under reduced motion.
      mm.add(media, (context) => {
        const { desktop, mobile } = context.conditions as MediaConditions;
        const { scroll } = hero;

        if (desktop) {
          gsap
            .timeline({
              defaults: { ease: ease.linear },
              // Back at the start, the inline styles go: an identity transform
              // left on the headline after it has moved makes Chrome render
              // its text unlike the static page (MOTION.md §0).
              onReverseComplete: () => {
                gsap.set([push, headline, fades], { clearProps: "transform,opacity" });
              },
              scrollTrigger: {
                trigger: section,
                start: scroll.start,
                end: scroll.end,
                pin: true,
                pinSpacing: false,
                scrub,
                invalidateOnRefresh: true,
                refreshPriority: refreshPriority.hero,
                onToggle: ({ isActive }) =>
                  gsap.set(
                    [push, headline],
                    isActive ? { willChange: "transform" } : { clearProps: "willChange" },
                  ),
              },
            })
            .to(
              push,
              { scale: scroll.push.scale, yPercent: scroll.push.yPercent, duration: scroll.push.until },
              0,
            )
            .to(
              headline,
              {
                y: () => -scroll.headline.rise * window.innerHeight,
                opacity: 0,
                duration: scroll.headline.until,
              },
              0,
            )
            .to(fades, { opacity: 0, duration: scroll.secondary.until }, 0);
        }

        if (mobile) {
          gsap.to(push, {
            yPercent: hero.drift.yPercent,
            ease: ease.linear,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub,
              refreshPriority: refreshPriority.hero,
            },
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
