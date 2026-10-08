import { NoirImage } from "@/components/image/NoirImage";
import { Caption } from "@/components/type/Caption";
import { copy } from "@/content/copy";
import { plates } from "@/content/plates";
import { featured } from "@/lib/motion";
import { FeaturedMotion } from "./FeaturedMotion";

/**
 * §6.03 Featured photograph, at rest: a standalone photograph, not one of
 * the five series. On desktop the caption's last baseline sits on the
 * photograph's bottom edge. FeaturedMotion adds the clip reveal (MOTION.md
 * §4.2): the reveal settles the inner layer, and on desktop the nested
 * layer drifts.
 */
export function Featured() {
  return (
    <FeaturedMotion data-theme="paper" className="page-grid pt-[8vh] pb-[26vh]">
      <figure className="col-span-full grid grid-cols-subgrid">
        <NoirImage
          plate={plates.p02}
          sizes="(width >= 1024px) 70vw, 100vw"
          nested
          drift={{ range: featured.drift.range, from: "lg" }}
          className="col-span-full -mx-margin lg:col-span-9 lg:col-start-2 lg:mx-0"
        />
        <Caption
          as="figcaption"
          caption={copy.featured.caption}
          trim="bottom"
          className="col-span-full mt-4 lg:col-span-2 lg:col-start-11 lg:mt-0 lg:self-end"
        />
      </figure>
    </FeaturedMotion>
  );
}
