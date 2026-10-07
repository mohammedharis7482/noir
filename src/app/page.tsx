import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { CONTENT_ID } from "@/components/layout/SkipLink";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Editorial } from "@/components/sections/editorial/Editorial";
import { Featured } from "@/components/sections/featured/Featured";
import { Fullscreen } from "@/components/sections/fullscreen/Fullscreen";
import { Hero } from "@/components/sections/hero/Hero";
import { Intro } from "@/components/sections/intro/Intro";
import { Marquee } from "@/components/sections/marquee/Marquee";
import { SelectedWork } from "@/components/sections/selected-work/SelectedWork";
import { VisualStories } from "@/components/sections/visual-stories/VisualStories";

/** The homepage, top down (DESIGN.md §6): sections 00–11, at rest. */
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
        <Fullscreen />
        <About />
        <Marquee />
        <Contact />
      </main>
      <Footer theme="dark" />
    </>
  );
}
