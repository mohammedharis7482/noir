"use client";

import { useEffect, useRef } from "react";

/**
 * The page grid at the current viewport, measured from a hidden page-grid
 * element: column count, margin and gutter in px. Updates on resize.
 */
export function GridReadout() {
  const probe = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!probe.current || !readout.current) return;
      const style = getComputedStyle(probe.current);
      const columns = style.gridTemplateColumns.split(" ").length;
      const margin = Math.round(parseFloat(style.paddingInlineStart));
      const gutter = Math.round(parseFloat(style.columnGap));
      readout.current.textContent = `${columns} columns / ${margin}px margin / ${gutter}px gutter`;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="col-span-full grid gap-2">
      <div ref={probe} aria-hidden="true" className="page-grid invisible h-0" />
      <p className="meta tabular-nums">
        <span ref={readout}>…</span>
      </p>
      <p className="meta text-fg-muted">Press g to show the columns.</p>
    </div>
  );
}
