import { NoirImage } from "@/components/image/NoirImage";
import { Caption } from "@/components/type/Caption";
import { copy } from "@/content/copy";
import { plates } from "@/content/plates";

const [lineOne, lineTwo] = copy.hero.headline;
const [issue, descriptor] = copy.hero.meta;

/**
 * §6.01 Hero, at rest. The photograph starts at the bottom edge of the
 * navigation band and bleeds off the right edge; below 1024px it spans the
 * width under the band. On desktop the section fills the viewport and the
 * headline sits on the bottom margin; the sizes behind that are in
 * globals.css (.hero).
 */
export function Hero() {
  return (
    <section
      data-theme="paper"
      aria-labelledby="hero-headline"
      className="hero page-grid grid-rows-[var(--spacing-nav)_auto_auto_auto] overflow-x-clip pb-margin lg:min-h-svh lg:grid-rows-[var(--spacing-nav)_auto_1fr_auto]"
    >
      <NoirImage
        plate={plates.p01}
        priority
        sizes="(width >= 1024px) 60vw, 100vw"
        ratio="auto"
        focal="40% 30%"
        focalMobile="55% 50%"
        className="col-span-full row-start-2 -mx-margin h-(--hero-photo) lg:col-start-6 lg:ms-0 lg:bleed-right"
      />
      <div className="meta col-span-full row-start-3 mt-6 text-fg-muted lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:trim-cap lg:self-start">
        <p>{issue}</p>
        <p>{descriptor}</p>
      </div>
      <h1
        id="hero-headline"
        className="display-xl col-span-full row-start-4 mt-(--hero-gap) mb-(--hero-descender)"
      >
        <span className="block">{lineOne}</span>
        <span className="indent-column block">{lineTwo}</span>
      </h1>
      <Caption
        caption={copy.hero.caption}
        trim="top"
        className="max-lg:hidden lg:col-span-3 lg:col-start-10 lg:row-start-4 lg:mt-(--hero-caption-offset) lg:self-start"
      />
    </section>
  );
}
