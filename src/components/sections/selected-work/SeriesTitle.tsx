import type { Ref } from "react";
import { captionDetails } from "@/content/copy";
import type { Series } from "@/content/series";

type SeriesTitleProps = {
  series: Series;
  /** The heading's id, for the series' aria-labelledby. */
  id: string;
  /** display-l on the desktop stage, display-m in the mobile stack. */
  size: "l" | "m";
  /** Sets the details' baseline, not their line box, on the block's bottom edge. */
  trimBaseline?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

/**
 * A series' title in italic display type (it is the title of a work, §3)
 * with its details in meta beneath.
 */
export function SeriesTitle({ series, id, size, trimBaseline, className, ref }: SeriesTitleProps) {
  return (
    <div ref={ref} className={className}>
      <h3 id={id} className={size === "l" ? "display-l italic" : "display-m italic"}>
        {series.copy.title}
      </h3>
      {/* At display-l the italic descenders (0.215em) would touch the
          details' capitals without the extra 8px. */}
      <p
        className={[
          "meta text-fg-muted",
          size === "l" && "mt-2",
          trimBaseline && "trim-baseline",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {captionDetails(series.copy)}
      </p>
    </div>
  );
}
