"use client";

import { useSyncExternalStore, type Ref } from "react";
import { series } from "@/content/series";
import { pageTurnState } from "./pageTurnState";

type SeriesIndexProps = {
  /** The series on this stage, 0-based. */
  active: number;
  onSelect: (position: number) => void;
  className?: string;
  ref?: Ref<HTMLOListElement>;
};

const noPageTurn = () => null;

/**
 * §6.04 The index: the five series as buttons, the active one in fg and the
 * rest in fg-muted. Each row is 29px tall, above the 24px target minimum.
 * On the pinned stage (MOTION.md §5.3) the active row follows the series
 * the stage shows, its colour changing over 0.45s.
 */
export function SeriesIndex({ active, onSelect, className, ref }: SeriesIndexProps) {
  const turning = useSyncExternalStore(pageTurnState.subscribe, pageTurnState.active, noPageTurn);
  const current = turning ?? active;

  return (
    <ol ref={ref} data-stage-index="" className={className}>
      {series.map((item, position) => (
        <li key={item.slug}>
          <button
            type="button"
            aria-current={position === current ? "true" : undefined}
            onClick={() => onSelect(position)}
            className={`flex gap-3 py-2 transition-colors ${position === current ? "text-fg" : "text-fg-muted"}`}
          >
            <span className="tabular-nums">{item.copy.number}</span>
            {item.copy.title}
          </button>
        </li>
      ))}
    </ol>
  );
}
