import { copy } from "@/content/copy";

const [lineOne, lineTwo] = copy.editorial.statement;

/**
 * §6.05 Editorial statement, at rest: line 1 from col 1, line 2 from col 5,
 * the supporting line at cols 7–11 after a generous gap. Below 1024px line 2
 * keeps the same share of the row: one column of 4, three of 8.
 */
export function Editorial() {
  return (
    <section data-theme="paper" className="page-grid pt-[30vh] pb-[30vh]">
      <p className="display-l col-span-full">
        <span className="block">{lineOne}</span>
        <span className="block indent-cols-1 sm:indent-cols-3 lg:indent-cols-4">{lineTwo}</span>
      </p>
      <p className="display-m col-span-3 col-start-2 mt-[16vh] sm:col-span-5 sm:col-start-4 lg:col-start-7">
        {copy.editorial.supporting}
      </p>
    </section>
  );
}
