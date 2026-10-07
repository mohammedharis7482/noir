import { NoirImage } from "@/components/image/NoirImage";
import { Caption } from "@/components/type/Caption";
import { copy } from "@/content/copy";
import { plates } from "@/content/plates";

/**
 * §6.03 Featured photograph, at rest: a standalone photograph, not one of
 * the five series. On desktop the caption's last baseline sits on the
 * photograph's bottom edge.
 */
export function Featured() {
  return (
    <section data-theme="paper" className="page-grid pt-[8vh] pb-[26vh]">
      <figure className="col-span-full grid grid-cols-subgrid">
        <NoirImage
          plate={plates.p02}
          sizes="(width >= 1024px) 70vw, 100vw"
          className="col-span-full -mx-margin lg:col-span-9 lg:col-start-2 lg:mx-0"
        />
        <Caption
          as="figcaption"
          caption={copy.featured.caption}
          trim="bottom"
          className="col-span-full mt-4 lg:col-span-2 lg:col-start-11 lg:mt-0 lg:self-end"
        />
      </figure>
    </section>
  );
}
