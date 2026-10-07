"use client";

import type { Ref } from "react";
import { series } from "@/content/series";

type SeriesIndexProps = {
  /** The series on this stage, 0-based. */
  active: number;
  onSelect: (position: number) => void;
  className?: string;
  ref?: Ref<HTMLOListElement>;
};

/**
 * §6.04 The index: the five series as buttons, the active one in fg and the
 * rest in fg-muted. Each row is 29px tall, above the 24px target minimum.
 */
export function SeriesIndex({ active, onSelect, className, ref }: SeriesIndexProps) {
  return (
    <ol ref={ref} className={className}>
      {series.map((item, position) => (
        <li key={item.slug}>
          <button
            type="button"
            aria-current={position === active ? "true" : undefined}
            onClick={() => onSelect(position)}
            className={`flex gap-3 py-2 ${position === active ? "text-fg" : "text-fg-muted"}`}
          >
            <span className="tabular-nums">{item.copy.number}</span>
            {item.copy.title}
          </button>
        </li>
      ))}
    </ol>
  );
}
