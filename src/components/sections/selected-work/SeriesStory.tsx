"use client";

import { useRef } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { series } from "@/content/series";
import { pageTurnState } from "./pageTurnState";
import { SeriesStage, type StageLayers } from "./SeriesStage";

/**
 * §6.04 The desktop story: one 100svh stage per series, stacked. In motion
 * mode the page-turn (pageTurn.ts) turns them into a single pinned stage
 * (MOTION.md §5): the story is its trigger and the stack is what pins.
 * This stacked version stays as the reduced-motion version, and as the
 * version on screen until the page-turn is built.
 */
export function SeriesStory({ className }: { className?: string }) {
  const lenis = useLenis();
  const stages = useRef<(StageLayers | null)[]>([]);

  // An index row takes the reader to its series: on the pinned stage, the
  // page-turn travels there (MOTION.md §5.5); otherwise it scrolls to the
  // series' stage, with Lenis when it runs, natively (and instantly) under
  // reduced motion. Focus follows, so the next Tab continues from there.
  const select = (position: number) => {
    if (pageTurnState.travelTo(position)) return;
    const stage = stages.current[position]?.root;
    if (!stage) return;
    if (lenis) lenis.scrollTo(stage);
    else stage.scrollIntoView();
    stage.focus({ preventScroll: true });
  };

  return (
    <div data-series-story="" className={className}>
      <div data-stage-stack="">
        {series.map((item, position) => (
          <SeriesStage
            key={item.slug}
            ref={(layers) => {
              stages.current[position] = layers;
              return () => {
                stages.current[position] = null;
              };
            }}
            series={item}
            position={position}
            total={series.length}
            onSelect={select}
          />
        ))}
      </div>
    </div>
  );
}
