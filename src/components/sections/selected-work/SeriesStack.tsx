import { NoirImage } from "@/components/image/NoirImage";
import { series } from "@/content/series";
import { SeriesTitle } from "./SeriesTitle";

/**
 * §6.04 Below 1024px every series stacks: the main photograph full-bleed at
 * 4:5 but never taller than 62svh, as in the hero, so on tablets the crop
 * widens (focalMobile) and the title stays on the same screen. Then the
 * italic title and the details. No index, no support photographs.
 */
export function SeriesStack({ className }: { className?: string }) {
  return (
    <ol className={className}>
      {series.map((item) => (
        <li key={item.slug}>
          <article aria-labelledby={`${item.slug}-stack-title`}>
            <NoirImage
              plate={item.main.plate}
              ratio="auto"
              sizes="100vw"
              focalMobile={item.main.focalMobile}
              className="-mx-margin h-[min(125vw,62svh)]"
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
