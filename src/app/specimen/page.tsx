import type { Metadata } from "next";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { CONTENT_ID } from "@/components/layout/SkipLink";
import { copy } from "@/content/copy";
import { GridReadout } from "./_components/GridReadout";
import { ImageSamples } from "./_components/ImageSamples";
import { Palette } from "./_components/Palette";
import { SpecimenSection } from "./_components/SpecimenSection";
import { SyncTest } from "./_components/SyncTest";
import { TypeRoles } from "./_components/TypeRoles";

/* Dev-only specimen of the Phase 1 foundation. It is never linked from the
   site and asks search engines not to index it. */
export const metadata: Metadata = {
  title: "Specimen",
  robots: { index: false, follow: false },
};

export default function SpecimenPage() {
  return (
    <>
      <header className="page-grid h-16 items-center">
        <p className="wordmark">{copy.nav.wordmark}</p>
      </header>

      <main id={CONTENT_ID} tabIndex={-1}>
        <div className="page-grid pt-24">
          <h1 className="display-l col-span-full">Specimen</h1>
        </div>

        <SpecimenSection id="colour" title="Colour">
          <Palette />
        </SpecimenSection>

        <SpecimenSection id="typography" title="Typography">
          <TypeRoles />
        </SpecimenSection>

        <SpecimenSection id="grid" title="Grid, space and shape">
          <GridReadout />
        </SpecimenSection>

        <SpecimenSection id="image" title="Image system">
          <ImageSamples />
        </SpecimenSection>

        <SpecimenSection id="motion" title="Motion language">
          <SyncTest />
        </SpecimenSection>
      </main>

      {/* The root layout renders the overlay in development. */}
      {process.env.NODE_ENV !== "development" && <GridOverlay />}
    </>
  );
}
