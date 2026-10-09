"use client";

import type Lenis from "lenis";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, media, selectedWork, type MediaConditions } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";
import { buildPageTurn } from "./pageTurn";
import { buildStack } from "./stackMotion";

/**
 * Selected work's section, with its motion (MOTION.md §5) around the static
 * content SelectedWork renders. On desktop the five stages become one
 * pinned stage that turns like the pages of a book (pageTurn.ts). Below
 * 1024px the stacked series stay, with their own motion (stackMotion.ts).
 * A resize across 1024px keeps the reader at the same series.
 */
export function SelectedWorkMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const [story] = q("[data-series-story]");
      const [stack] = q("[data-stage-stack]");
      const mm = gsap.matchMedia();

      mm.add(media, (context) => {
        const { desktop, mobile } = context.conditions as MediaConditions;
        if (mobile) return buildStack(section);
        if (!desktop) return;
        return buildPageTurn({
          story,
          stack,
          // MOTION.md §5.5: with Lenis, natively without it.
          travel: (y, onArrive) => {
            const smooth = lenisRef.current;
            if (!smooth) {
              window.scrollTo(0, y);
              onArrive();
              return;
            }
            smooth.scrollTo(y, {
              duration: selectedWork.index.duration,
              easing: gsap.parseEase(ease.inOut),
              onComplete: onArrive,
            });
          },
          // Only the wheel's smoothing, whose target lies ahead of it: an
          // index row's scrollTo moves its target along and runs on.
          halt: () => {
            const smooth = lenisRef.current;
            if (smooth?.isScrolling !== "smooth" || smooth.targetScroll === smooth.animatedScroll) return;
            smooth.stop();
            smooth.start();
          },
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
