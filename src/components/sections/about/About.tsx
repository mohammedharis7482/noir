import { NoirImage } from "@/components/image/NoirImage";
import { FactsList } from "@/components/type/FactsList";
import { copy } from "@/content/copy";
import { plates } from "@/content/plates";

const facts = copy.about.facts.map((fact) => ({
  id: fact.label,
  term: fact.label,
  descriptions: [fact.value],
}));

/**
 * §6.08 About, at rest, in the darkroom. On desktop the portrait (cols 2–4)
 * starts 8vh below the paragraph's capitals, and the paragraph and the
 * facts share cols 7–12. Below 1024px: the portrait across three columns,
 * then the paragraph, then the facts. The portrait has no caption.
 */
export function About() {
  return (
    <section data-theme="dark" className="page-grid pt-[20vh] pb-[16vh]">
      <NoirImage
        plate={plates.p21}
        sizes="(width >= 1024px) 24vw, (width >= 640px) 37vw, 75vw"
        className="col-span-3 lg:col-start-2 lg:row-start-1 lg:mt-[8vh] lg:self-start"
      />
      <div className="col-span-full mt-12 grid grid-cols-subgrid lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:self-start">
        <p className="text-l col-span-full lg:trim-cap">{copy.about.paragraph}</p>
        <FactsList
          facts={facts}
          termClassName="meta col-span-2 text-fg-muted"
          descriptionClassNames={["meta col-start-3 -col-end-1"]}
          className="col-span-full mt-12"
        />
      </div>
    </section>
  );
}
