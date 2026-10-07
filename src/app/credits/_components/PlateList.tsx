import { FactsList, type Fact } from "@/components/type/FactsList";
import { captionDetails, copy, type Caption } from "@/content/copy";
import { plateIds, plates, type Plate } from "@/content/plates";

/** The five series' captions, which their support photographs share. */
const seriesCaptions = new Set<Caption>(copy.selectedWork.series);

/** A support photograph without a caption of its own is a detail of its series. */
function isSeriesDetail(plate: Plate): boolean {
  return plate.role === "series-support" && seriesCaptions.has(plate.caption);
}

const facts: readonly Fact[] = plateIds.map((id) => {
  const plate = plates[id];
  return {
    id,
    term: id.slice(1),
    descriptions: [
      isSeriesDetail(plate) ? (
        <>
          {plate.caption.title} <span className="not-italic">{copy.credits.plates.detail}</span>
        </>
      ) : (
        plate.caption.title
      ),
      captionDetails(plate.caption),
    ],
  };
});

/**
 * §6.12 The list of plates: all 21 in plate order, each with its number,
 * its title in italic (it is the title of a work) and its details. Below
 * 1024px each row stacks.
 */
export function PlateList({ className }: { className?: string }) {
  return (
    <FactsList
      facts={facts}
      termClassName="meta col-span-full tabular-nums lg:col-span-1"
      descriptionClassNames={[
        "caption-title col-span-full lg:col-span-5",
        "meta col-span-full text-fg-muted lg:col-span-6",
      ]}
      className={className}
    />
  );
}
