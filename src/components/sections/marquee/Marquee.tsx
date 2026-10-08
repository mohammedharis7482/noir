import { Fragment } from "react";
import { copy } from "@/content/copy";
import { MarqueeMotion } from "./MarqueeMotion";

const line = copy.marquee.items.map((item) => (
  <Fragment key={item}>
    {item} <span className="text-fg-muted">{copy.marquee.separator}</span>{" "}
  </Fragment>
));

/**
 * §6.09 Marquee: the line from the left margin, running off the right edge
 * of the viewport. MarqueeMotion drifts it (MOTION.md §4.5) by moving the
 * track, which holds a second, aria-hidden copy that only motion mode shows
 * (globals.css). The line keeps its spaces (whitespace-pre), its last one
 * included, so a copy is exactly half the track.
 */
export function Marquee() {
  return (
    <MarqueeMotion data-theme="dark" className="overflow-x-clip py-[10vh]">
      <div className="page-grid">
        <p className="display-l col-span-full whitespace-pre">
          <span data-marquee-track="" className="block w-max">
            {line}
            <span data-marquee-copy="" aria-hidden="true">
              {line}
            </span>
          </span>
        </p>
      </div>
    </MarqueeMotion>
  );
}
