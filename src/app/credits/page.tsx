import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { CONTENT_ID } from "@/components/layout/SkipLink";
import { copy } from "@/content/copy";
import { PlateList } from "./_components/PlateList";

// The root layout's template makes the tab "Notes and credits / NOIR".
export const metadata: Metadata = {
  title: copy.credits.title,
  description: copy.credits.description,
};

const { colophon } = copy.credits;

/**
 * §6.12 Notes and credits, on paper: the title 20vh below the navigation
 * band, the concept and the colophon, then the list of plates.
 */
export default function CreditsPage() {
  return (
    <>
      <Navigation />
      <main
        id={CONTENT_ID}
        tabIndex={-1}
        data-theme="paper"
        className="page-grid pt-[calc(var(--spacing-nav)+20vh)] pb-[20vh]"
      >
        <h1 className="display-l trim-cap col-span-full lg:col-span-8">{copy.credits.title}</h1>
        <div className="text-l col-span-full mt-16 space-y-12 lg:col-span-7">
          <p>{copy.credits.concept}</p>
          <p>
            {colophon.before}
            <a href={colophon.link.href} className="underline decoration-1 underline-offset-[0.15em]">
              {colophon.link.label}
            </a>
            {colophon.after}
          </p>
        </div>
        <section
          aria-labelledby="plates-title"
          className="col-span-full mt-[16vh] grid grid-cols-subgrid"
        >
          <h2 id="plates-title" className="display-m col-span-full">
            {copy.credits.plates.title}
          </h2>
          <PlateList className="col-span-full mt-12" />
        </section>
      </main>
      <Footer theme="paper" />
    </>
  );
}
