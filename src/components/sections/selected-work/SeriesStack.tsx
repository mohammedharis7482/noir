import { NoirImage } from "@/components/image/NoirImage";
import { series } from "@/content/series";
import { SeriesTitle } from "./SeriesTitle";

/**
 * §6.04 Below 1024px every series stacks: the main photograph full-bleed at
 * 4:5, then the italic title and the details. No index, no support
 * photographs.
 */
export function SeriesStack({ className }: { className?: string }) {
  return (
    <ol className={className}>
      {series.map((item) => (
        <li key={item.slug}>
          <article aria-labelledby={`${item.slug}-stack-title`}>
            <NoirImage
              plate={item.main.plate}
              ratio="4:5"
              sizes="100vw"
              focal={item.main.focal}
              className="-mx-margin"
            />
            <SeriesTitle
              series={item}
              id={`${item.slug}-stack-title`}
              size="m"
              className="mt-4"
            />
          </article>
        </li>
      ))}
    </ol>
  );
}
