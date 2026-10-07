import type { CSSProperties } from "react";
import { NoirImage } from "@/components/image/NoirImage";
import { Caption } from "@/components/type/Caption";
import { copy } from "@/content/copy";
import { ratios } from "@/content/plates";
import { strip, type StripFrame } from "@/content/strip";

const alignClass = {
  start: "lg:self-start",
  center: "lg:self-center",
  end: "lg:self-end",
} as const;

/** The photograph's width on desktop (its height times its ratio), for the srcset. */
function stripSizes(frame: StripFrame): string {
  const [w, h] = ratios[frame.plate.ratio].split(" / ").map(Number);
  return `(width >= 1024px) ${Math.ceil(parseFloat(frame.height) * (w / h))}vh, 72vw`;
}

/**
 * §6.06 Visual stories, at rest. A native horizontal scroll container for
 * now: Phase 6 pins the section and scrubs the strip instead. On desktop the
 * progress rule and counter show their starting state; below 1024px the
 * strip snaps, with every photograph about 72vw wide.
 */
export function VisualStories() {
  return (
    <section data-theme="paper" aria-labelledby="visual-stories-title" className="pt-[14vh]">
      <div className="lg:flex lg:h-svh lg:flex-col">
        <div
          role="region"
          aria-labelledby="visual-stories-title"
          tabIndex={0}
          className="snap-x snap-proximity scroll-px-margin overflow-x-auto lg:flex-1 lg:snap-none lg:scrollbar-hidden"
        >
          <div className="flex w-max items-end px-margin lg:h-full lg:items-stretch lg:pt-nav lg:pb-8">
            <div className="snap-start self-start">
              <h2 id="visual-stories-title" className="display-m trim-cap">
                {copy.visualStories.title}
              </h2>
              <p className="meta mt-4 max-w-[22ch] text-fg-muted">{copy.visualStories.description}</p>
            </div>
            <ol className="flex items-end lg:items-stretch">
              {strip.map((frame) => (
                <li
                  key={frame.plate.id}
                  style={{ "--strip-height": frame.height, "--strip-gap": frame.gap } as CSSProperties}
                  className={`ml-gutter snap-start lg:ml-(--strip-gap) ${alignClass[frame.align]}`}
                >
                  <figure className="flex flex-col items-start">
                    <NoirImage
                      plate={frame.plate}
                      sizes={stripSizes(frame)}
                      className="w-[72vw] lg:h-(--strip-height) lg:w-auto"
                    />
                    {frame.plate.caption && (
                      <Caption as="figcaption" caption={frame.plate.caption} className="mt-3" />
                    )}
                  </figure>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div aria-hidden="true" className="flex items-end gap-6 px-margin pt-6 pb-margin max-lg:hidden">
          <div className="relative h-px flex-1 bg-line">
            <div className="absolute inset-y-0 left-0 w-0 bg-fg" />
          </div>
          <p className="meta trim-baseline tabular-nums">01 / {String(strip.length).padStart(2, "0")}</p>
        </div>
      </div>
    </section>
  );
}
