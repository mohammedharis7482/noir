import { Fragment } from "react";
import { copy } from "@/content/copy";

/**
 * §6.09 Marquee, at rest: the line once, from the left margin, running off
 * the right edge of the viewport. The drift and its aria-hidden copies come
 * with the motion phases.
 */
export function Marquee() {
  return (
    <section data-theme="dark" className="overflow-x-clip py-[10vh]">
      <div className="page-grid">
        <p className="display-l col-span-full whitespace-nowrap">
          {copy.marquee.items.map((item) => (
            <Fragment key={item}>
              {item} <span className="text-fg-muted">{copy.marquee.separator}</span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
