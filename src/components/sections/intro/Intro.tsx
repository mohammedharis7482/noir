import { copy } from "@/content/copy";
import { IntroMotion } from "./IntroMotion";

const [series, years] = copy.intro.meta;

/**
 * §6.02 Intro statement, at rest. On desktop the meta block shares the
 * statement's row and its last baseline. It sits above the hero (z-1) on
 * its own paper, so it scrolls up over the pinned hero (MOTION.md §3.2).
 * IntroMotion reveals the statement's lines (data-lines), then the meta
 * block (data-fade), as MOTION.md §4.1 describes.
 */
export function Intro() {
  return (
    <IntroMotion
      data-theme="paper"
      className="page-grid relative z-1 items-baseline-last pt-[22vh] pb-[18vh]"
    >
      <p data-lines="" className="display-l col-span-full lg:col-span-9 lg:col-start-3">
        {copy.intro.statement}
      </p>
      <div
        data-fade=""
        className="meta col-span-full mt-8 text-fg-muted lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mt-0"
      >
        <p>{series}</p>
        <p>{years}</p>
      </div>
    </IntroMotion>
  );
}
