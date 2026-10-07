import { NoirImage } from "@/components/image/NoirImage";
import { Caption } from "@/components/type/Caption";
import { copy } from "@/content/copy";
import { plates } from "@/content/plates";

/**
 * §6.07 Fullscreen moment, at rest: the end of the takeover. The photograph
 * fills the viewport on desktop and spans the width at 4:5 below 1024px,
 * with its caption over it in white at the bottom left. The section ends at
 * the photograph's bottom edge, so the dark About section begins there with
 * no paper between them. Phase 7 adds the small start state and the motion.
 */
export function Fullscreen() {
  return (
    <section data-theme="paper">
      <figure className="relative">
        <NoirImage
          plate={plates.p20}
          ratio="4:5"
          sizes="100vw"
          focalMobile="48% 50%"
          className="lg:aspect-auto lg:h-svh"
        />
        <figcaption className="absolute inset-x-0 bottom-0">
          <div className="page-grid pb-margin">
            <Caption
              caption={copy.fullscreen.caption}
              trim="bottom"
              overPhotograph
              className="col-span-full"
            />
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
