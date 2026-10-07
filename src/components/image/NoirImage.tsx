import Image from "next/image";
import type { CSSProperties } from "react";
import { hasPlateFile, plateSrc, ratios, type Plate, type Ratio } from "@/content/plates";

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
};

/**
 * Every photograph renders through NoirImage (docs/DESIGN.md §5).
 *
 * The frame owns the aspect ratio, overflow and any clip-path; the inner
 * layer owns the image and any scale or translate. Motion targets
 * [data-noir-frame], [data-noir-inner] and, when there is one, the nested
 * layer [data-noir-nested], never the <img> itself.
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
      <div data-noir-inner="" className="absolute inset-0">
        {nested ? (
          <div data-noir-nested="" className="absolute inset-0">
            {picture}
          </div>
        ) : (
          picture
        )}
      </div>
    </div>
  );
}
