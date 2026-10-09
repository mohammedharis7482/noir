import { copy } from "@/content/copy";
import { SelectedWorkMotion } from "./SelectedWorkMotion";
import { SeriesStack } from "./SeriesStack";
import { SeriesStory } from "./SeriesStory";

/**
 * §6.04 Selected work, at rest: the title row, then the five series as
 * 100svh stages on desktop, or stacked below 1024px. SelectedWorkMotion
 * turns the stages into the pinned page-turn (MOTION.md §5); the title row
 * never moves.
 */
export function SelectedWork() {
  return (
    <SelectedWorkMotion data-theme="paper" aria-labelledby="selected-work-title" className="pt-[18vh]">
      <div className="page-grid items-baseline">
        <h2 id="selected-work-title" className="display-m col-span-3 sm:col-span-6">
          {copy.selectedWork.title}
        </h2>
        <p className="meta -col-end-1 justify-self-end text-fg-muted">{copy.selectedWork.years}</p>
      </div>
      <SeriesStory className="max-lg:hidden" />
      <div className="page-grid lg:hidden">
        <SeriesStack className="col-span-full mt-12 space-y-24" />
      </div>
    </SelectedWorkMotion>
  );
}
