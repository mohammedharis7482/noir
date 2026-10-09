"use client";

import { useImperativeHandle, useRef, type CSSProperties, type Ref } from "react";
import { NoirImage } from "@/components/image/NoirImage";
import type { Frame, Series } from "@/content/series";
import { SeriesIndex } from "./SeriesIndex";
import { SeriesTitle } from "./SeriesTitle";

/** A stage's root, which the static story scrolls to. */
export type StageLayers = {
  readonly root: HTMLElement | null;
};

type SeriesStageProps = {
  series: Series;
  /** 0-based position in the sequence. */
  position: number;
  total: number;
  onSelect: (position: number) => void;
  ref?: Ref<StageLayers>;
};

// Placements hang from the stage's two lines, --stage-inset in from its top
// and bottom edges (series.ts).
const placementClass = {
  high: "self-start mt-(--stage-inset)",
  lower: "self-end mb-(--stage-inset)",
  "overlaps-main-lower-left":
    "relative z-10 self-end mb-[calc(var(--stage-inset)-var(--frame-shift))]",
} as const;

/** The frame's share of a 12-column viewport, for the srcset. */
function frameSizes(frame: Frame): string {
  const [first, last] = frame.cols;
  const bleed = frame.bleedsRight ? 4 : 0;
  return `${Math.ceil(((last - first + 1) / 12) * 100) + bleed}vw`;
}

type StageFrameProps = {
  frame: Frame;
  /** Which photograph of the series it is, for the page-turn (MOTION.md §5.3). */
  role: "main" | "support";
};

/** One photograph on the stage, placed by the series' frame preset. */
function StageFrame({ frame, role }: StageFrameProps) {
  const [first, last] = frame.cols;
  const style = {
    gridRow: 1,
    gridColumn: `${first} / ${last + 1}`,
    height: frame.height,
    "--frame-shift": frame.shift,
  } as CSSProperties;

  return (
    <div
      data-stage-frame={role}
      style={style}
      className={[
        frame.placement ? placementClass[frame.placement] : "self-center",
        frame.bleedsRight && "bleed-right",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <NoirImage
        plate={frame.plate}
        sizes={frameSizes(frame)}
        ratio={frame.height ? "auto" : frame.ratio}
        focal={frame.focal}
        className={frame.height ? "h-full" : undefined}
      />
    </div>
  );
}

/**
 * §6.04 One series on the desktop stage, at rest: the index with this
 * series active, the main and support photographs placed by the series'
 * frame preset, the title and the counter. The type sits on two lines,
 * 12svh in from the stage's top and bottom edges (globals.css,
 * .series-stage), and the photographs' placements hang from the same lines.
 * The counter's digits are an element of their own, so the pinned stage can
 * roll them (MOTION.md §5.3).
 */
export function SeriesStage({ series, position, total, onSelect, ref }: SeriesStageProps) {
  const root = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => ({ root: root.current }));

  const titleId = `${series.slug}-stage-title`;

  return (
    <article
      ref={root}
      aria-labelledby={titleId}
      tabIndex={-1}
      className="series-stage page-grid h-svh grid-rows-1 overflow-x-clip"
    >
      <SeriesIndex
        active={position}
        onSelect={onSelect}
        className="ui col-span-3 col-start-1 row-start-1 mt-[calc(var(--stage-inset)-var(--spacing-2)-var(--cap-inset))] self-start"
      />
      <p
        aria-hidden="true"
        data-stage-counter=""
        className="meta col-start-12 row-start-1 mt-[calc(var(--stage-inset)-var(--cap-inset))] self-start justify-self-end tabular-nums"
      >
        <span data-counter-digits="" className="inline-block">
          {series.copy.number}
        </span>
        <span data-counter-total="">{` / ${String(total).padStart(2, "0")}`}</span>
      </p>
      <StageFrame role="main" frame={series.main} />
      {series.support && <StageFrame role="support" frame={series.support} />}
      <SeriesTitle
        series={series}
        id={titleId}
        size="l"
        trimBaseline
        className="col-span-5 col-start-1 row-start-1 mb-(--stage-inset) self-end"
      />
    </article>
  );
}
