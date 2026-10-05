import Image from "next/image";
import type { CSSProperties } from "react";
import { plateSrc, ratios, type Plate, type Ratio } from "@/content/plates";
import { hasPlateFile } from "./plate-file";

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
};

/**
 * Every photograph renders through NoirImage (docs/DESIGN.md §5).
 *
 * The frame owns the aspect ratio, overflow and any clip-path; the inner
 * layer owns the image and any scale or translate. Motion targets
 * [data-noir-frame] and [data-noir-inner], never the <img> itself.
 *
 * It is a server component because it checks that the file exists. Render
 * it from server components and pass it to client motion wrappers as
 * children.
 */
export function NoirImage({
  plate,
  sizes,
  priority = false,
  focal,
  focalMobile,
  ratio,
  className,
}: NoirImageProps) {
  const aspect = ratio ?? plate.ratio;
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
        {hasPlateFile(plate) ? (
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
        )}
      </div>
    </div>
  );
}
