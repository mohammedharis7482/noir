"use client";

import { useEffect, useRef } from "react";
import { contrastRatio, parseRgb, toHex } from "./contrast";

type SwatchProps = {
  token: string;
  /** A literal Tailwind class such as "bg-ink", so the utility is generated. */
  className: string;
  use: string;
};

/**
 * One palette token, measured from the rendered page rather than restated:
 * its hex value and its contrast against the themed panel it sits on.
 */
export function Swatch({ token, className, use }: SwatchProps) {
  const chip = useRef<HTMLSpanElement>(null);
  const hex = useRef<HTMLSpanElement>(null);
  const ratio = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const panel = chip.current?.closest("[data-theme]");
    if (!chip.current || !panel || !hex.current || !ratio.current) return;

    const colour = parseRgb(getComputedStyle(chip.current).backgroundColor);
    const background = parseRgb(getComputedStyle(panel).backgroundColor);
    if (!colour || !background) return;

    hex.current.textContent = toHex(colour);
    ratio.current.textContent = `${contrastRatio(colour, background).toFixed(2)}:1`;
  }, []);

  return (
    <li className="flex items-start gap-4">
      <span
        ref={chip}
        className={`size-12 shrink-0 outline-1 -outline-offset-1 outline-line ${className}`}
      />
      <span className="grid gap-1">
        <span className="ui">{token}</span>
        <span className="meta tabular-nums">
          <span ref={hex}>…</span> / <span ref={ratio}>…</span>
        </span>
        <span className="meta text-fg-muted">{use}</span>
      </span>
    </li>
  );
}
