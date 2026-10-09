import { NoirImage } from "@/components/image/NoirImage";
import { series } from "@/content/series";
import { selectedWork } from "@/lib/motion";
import { SeriesTitle } from "./SeriesTitle";

/**
 * §6.04 Below 1024px every series stacks: the main photograph full-bleed at
 * 4:5 but never taller than 62svh, as in the hero, so on tablets the crop
 * widens (focalMobile) and the title stays on the same screen. Then the
 * italic title and the details. No index, no support photographs. In
 * motion mode each photograph drifts on its own layer and each title's
 * lines rise once (MOTION.md §5.6, stackMotion.ts).
 */
export function SeriesStack({ className }: { className?: string }) {
  return (
    <ol data-series-stack="" className={className}>
      {series.map((item) => (
        <li key={item.slug}>
          <article aria-labelledby={`${item.slug}-stack-title`}>
            <NoirImage
              plate={item.main.plate}
              ratio="auto"
              sizes="100vw"
              focalMobile={item.main.focalMobile}
              drift={{ range: selectedWork.stack.drift.range }}
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
