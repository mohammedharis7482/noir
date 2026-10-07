import { copy } from "@/content/copy";

const [series, years] = copy.intro.meta;

/**
 * §6.02 Intro statement, at rest. On desktop the meta block shares the
 * statement's row and its last baseline.
 */
export function Intro() {
  return (
    <section data-theme="paper" className="page-grid items-baseline-last pt-[22vh] pb-[18vh]">
      <p className="display-l col-span-full lg:col-span-9 lg:col-start-3">{copy.intro.statement}</p>
      <div className="meta col-span-full mt-8 text-fg-muted lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mt-0">
        <p>{series}</p>
        <p>{years}</p>
      </div>
    </section>
  );
}
