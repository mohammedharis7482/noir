"use client";

import { useRef } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { series } from "@/content/series";
import { SeriesStage, type StageLayers } from "./SeriesStage";

/**
 * §6.04 The desktop story: one 100svh stage per series, stacked. Phase 5
 * turns it into a single pinned stage; this stacked version stays as the
 * reduced-motion fallback, so every stage's layers stay addressable here.
 */
export function SeriesStory({ className }: { className?: string }) {
  const lenis = useLenis();
  const stages = useRef<(StageLayers | null)[]>([]);

  // An index row scrolls to its series' stage: with Lenis when it runs,
  // natively (and instantly) under reduced motion. Focus follows, so the
  // next Tab continues from the stage the reader arrived at.
  const select = (position: number) => {
    const stage = stages.current[position]?.root;
    if (!stage) return;
    if (lenis) lenis.scrollTo(stage);
    else stage.scrollIntoView();
    stage.focus({ preventScroll: true });
  };

  return (
    <div className={className}>
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
  );
}
