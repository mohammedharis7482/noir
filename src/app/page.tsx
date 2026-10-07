import { Navigation } from "@/components/layout/Navigation";
import { CONTENT_ID } from "@/components/layout/SkipLink";
import { Featured } from "@/components/sections/featured/Featured";
import { Hero } from "@/components/sections/hero/Hero";
import { Intro } from "@/components/sections/intro/Intro";

/** The homepage, top down (DESIGN.md §6). Phase 2a: sections 00–03, at rest. */
export default function Home() {
  return (
    <>
      <Navigation />
      <main id={CONTENT_ID} tabIndex={-1}>
        <Hero />
        <Intro />
        <Featured />
      </main>
    </>
  );
}
