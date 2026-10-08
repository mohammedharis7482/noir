import { copy } from "@/content/copy";
import { EditorialMotion } from "./EditorialMotion";

const [lineOne, lineTwo] = copy.editorial.statement;

/**
 * §6.05 Editorial statement, at rest: line 1 from col 1, line 2 from col 5,
 * the supporting line at cols 7–11 after a generous gap. Below 1024px line 2
 * keeps the same share of the row: one column of 4, three of 8.
 * EditorialMotion reveals them (MOTION.md §4.3): data-line marks the pair's
 * two lines. The space between them keeps the statement one sentence for
 * screen readers; between two blocks it never renders.
 */
export function Editorial() {
  return (
    <EditorialMotion data-theme="paper" className="page-grid pt-[30vh] pb-[30vh]">
      <p data-pair="" className="display-l col-span-full">
        <span data-line="1" className="block">
          {lineOne}
        </span>{" "}
        <span data-line="2" className="block indent-cols-1 sm:indent-cols-3 lg:indent-cols-4">
          {lineTwo}
        </span>
      </p>
      <p
        data-supporting=""
        className="display-m col-span-3 col-start-2 mt-[16vh] sm:col-span-5 sm:col-start-4 lg:col-start-7"
      >
        {copy.editorial.supporting}
      </p>
    </EditorialMotion>
  );
}
