import Image from "next/image";
import type { CSSProperties } from "react";
import { hasPlateFile, plateSrc, ratios, type Plate, type Ratio } from "@/content/plates";

/** An inner layer that drifts while its frame stays still (MOTION.md §4). */
type Drift = {
  /** How far the layer moves either way, in % of its own height. */
  range: number;
  /** "lg": on desktop only. Without it, at every width. */
  from?: "lg";
};

type NoirImageProps = {
  plate: Plate;
  /** How wide the photograph renders, for the srcset. Always explicit. */
  sizes: string;
  /** The hero only: preloaded and fetched eagerly. Everything else lazy-loads. */
  priority?: boolean;
  /** The crop, as an object-position value such as "50% 30%". */
  focal?: string;
  /** The crop below 1024px. Falls back to focal. */
  focalMobile?: string;
  /** Overrides the plate's ratio. "auto" leaves the frame's size to className. */
  ratio?: Ratio | "auto";
  /** Placement and sizing classes for the frame. */
  className?: string;
  /**
   * A second layer inside the inner one, for a photograph that two
   * animations move at once (MOTION.md §2.6): the hero's load settles the
   * inner layer while its scroll pushes this one, so they never fight.
   */
  nested?: boolean;
  /**
   * The innermost layer drifts. In motion mode globals.css makes it just
   * tall enough to cover the drift, so the frame never shows an empty edge
   * (MOTION.md §0); on the static page it is the frame's own size.
   */
  drift?: Drift;
};

/**
 * Every photograph renders through NoirImage (docs/DESIGN.md §5).
 *
 * The frame owns the aspect ratio, overflow and any clip-path; the inner
 * layer owns the image and any scale or translate. Motion targets
 * [data-noir-frame], [data-noir-inner] and, when there is one, the nested
 * layer [data-noir-nested], never the <img> itself. A drifting layer is
 * also [data-noir-drift].
 *
 * It renders the same in server and client components: whether a file
 * exists comes from the build-time manifest in src/content/plate-files.ts,
 * so nothing here touches the file system.
 */
export function NoirImage({
  plate,
  sizes,
  priority = false,
  focal,
  focalMobile,
  ratio,
  className,
  nested = false,
  drift,
}: NoirImageProps) {
  const aspect = ratio ?? plate.ratio;
  const picture = hasPlateFile(plate) ? (
    <Image
      src={plateSrc(plate)}
      alt={plate.alt}
      fill
      sizes={sizes}
      preload={priority}
      className="object-cover object-(--noir-focal-mobile) lg:object-(--noir-focal)"
    />
  ) : (
    <div
      role="img"
      aria-label={plate.alt}
      className="flex size-full items-center justify-center bg-line text-fg"
    >
      <span className="meta">{plate.id}</span>
    </div>
  );
  // The innermost layer holds the picture. A drifting one takes its top and
  // bottom from globals.css, which oversizes it in motion mode.
  const innermost = drift
    ? {
        className: "absolute inset-x-0",
        "data-noir-drift": drift.from ?? "always",
        style: { "--noir-drift": drift.range / 100 } as CSSProperties,
      }
    : { className: "absolute inset-0" };
  const style = {
    "--noir-ratio": aspect === "auto" ? "auto" : ratios[aspect],
    "--noir-focal": focal,
    "--noir-focal-mobile": focalMobile ?? focal,
  } as CSSProperties;

  return (
    <div
      data-noir-frame=""
      data-plate={plate.id}
      className={["relative aspect-(--noir-ratio) overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {nested ? (
        <div data-noir-inner="" className="absolute inset-0">
          <div data-noir-nested="" {...innermost}>
            {picture}
          </div>
        </div>
      ) : (
        <div data-noir-inner="" {...innermost}>
          {picture}
        </div>
      )}
    </div>
  );
}
