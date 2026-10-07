"use client";

import { useState } from "react";
import { NoirImage } from "@/components/image/NoirImage";
import { captionDetails } from "@/content/copy";
import { plates, type Ratio } from "@/content/plates";

const plate = plates.p01;
const crops: readonly Ratio[] = ["3:2", "4:5", "16:9"];

/**
 * NoirImage rendered, and re-rendered, by a client component: the proof that
 * it carries nothing server-only. The button changes the ratio override in
 * client state.
 */
export function ClientImageSample() {
  const [crop, setCrop] = useState(0);
  const ratio = crops[crop];

  return (
    <div className="col-span-full grid gap-3 sm:col-span-5 sm:col-start-4">
      <figure>
        <NoirImage
          plate={plate}
          ratio={ratio}
          sizes="(width >= 1024px) 35vw, (width >= 640px) 60vw, 90vw"
        />
        {plate.caption && (
          <figcaption className="mt-3 grid gap-1">
            <cite className="caption-title">{plate.caption.title}</cite>
            <span className="meta">{captionDetails(plate.caption)}</span>
            <span className="meta text-fg-muted">Rendered by a client component</span>
          </figcaption>
        )}
      </figure>
      <button
        type="button"
        className="ui justify-self-start py-2"
        onClick={() => setCrop((current) => (current + 1) % crops.length)}
      >
        Ratio {ratio}
      </button>
    </div>
  );
}
