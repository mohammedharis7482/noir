import { Navigation } from "@/components/layout/Navigation";
import { CONTENT_ID } from "@/components/layout/SkipLink";
import { Editorial } from "@/components/sections/editorial/Editorial";
import { Featured } from "@/components/sections/featured/Featured";
import { Hero } from "@/components/sections/hero/Hero";
import { Intro } from "@/components/sections/intro/Intro";
import { SelectedWork } from "@/components/sections/selected-work/SelectedWork";
import { VisualStories } from "@/components/sections/visual-stories/VisualStories";

/** The homepage, top down (DESIGN.md §6). Phases 2a and 2b: sections 00–06, at rest. */
export default function Home() {
  return (
    <>
      <Navigation />
      <main id={CONTENT_ID} tabIndex={-1}>
        <Hero />
        <Intro />
        <Featured />
        <SelectedWork />
        <Editorial />
        <VisualStories />
      </main>
    </>
  );
}
