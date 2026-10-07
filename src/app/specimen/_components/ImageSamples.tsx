import { NoirImage } from "@/components/image/NoirImage";
import { captionDetails } from "@/content/copy";
import { plates, type Plate } from "@/content/plates";

type Sample = { plate: Plate; className: string; sizes: string };

/* One plate per ratio. None of the photographs exist yet, so each renders
   as the placeholder block. Spans follow DESIGN.md §4: 3, 5 and 7 columns,
   at different heights. */
const samples: Sample[] = [
  {
    plate: plates.p03, // 4:5
    className: "col-span-3",
    sizes: "(width >= 1024px) 20vw, (width >= 640px) 35vw, 70vw",
  },
  {
    plate: plates.p02, // 3:2
    className: "col-span-full sm:col-span-5 sm:mt-24",
    sizes: "(width >= 1024px) 35vw, (width >= 640px) 60vw, 90vw",
  },
  {
    plate: plates.p07, // 16:9
    className: "col-span-full sm:col-span-7",
    sizes: "(width >= 1024px) 55vw, (width >= 640px) 85vw, 90vw",
  },
];

export function ImageSamples() {
  return (
    <>
      {samples.map(({ plate, className, sizes }) => (
        <figure key={plate.id} className={className}>
          <NoirImage plate={plate} sizes={sizes} />
          {plate.caption && (
            <figcaption className="mt-3 grid gap-1">
              <cite className="caption-title">{plate.caption.title}</cite>
              <span className="meta">{captionDetails(plate.caption)}</span>
              <span className="meta text-fg-muted">{plate.ratio}</span>
            </figcaption>
          )}
        </figure>
      ))}
    </>
  );
}
