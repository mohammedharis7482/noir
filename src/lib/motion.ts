/*
 * Motion tokens (docs/DESIGN.md §7, CLAUDE.md "Motion rules"). Every tween
 * takes its ease, duration and stagger from here: no inline numbers.
 */

/** Cubic-bezier control points. gsap.ts registers them as named eases;
 *  globals.css repeats them for CSS transitions. */
export const bezier = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** GSAP ease names. The noir eases are registered with CustomEase in gsap.ts. */
export const ease = {
  out: "noir.out",
  inOut: "noir.inOut",
  /** Movement in direct proportion to scroll or time: the strip, the marquee. */
  linear: "none",
} as const;

/** Durations in seconds. */
export const duration = {
  ui: 0.45,
  text: 0.9,
  image: 1.2,
  cinematic: 1.6,
} as const;

/** Delay between masked lines. DESIGN allows 0.08–0.12s. */
export const stagger = {
  lines: 0.1,
} as const;

/** Scrubbed tweens trail the scroll by one second. */
export const scrub = 1;

/** The three gsap.matchMedia() branches every motion hook creates. Range
 *  syntax leaves no gap between desktop and mobile, even at fractional
 *  widths under zoom. 1024px matches --breakpoint-lg in globals.css. */
export const media = {
  desktop: "(width >= 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(width < 1024px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

/** What gsap.matchMedia() reports for the media branches above. */
export type MediaConditions = Record<keyof typeof media, boolean>;

/** Motion is allowed at any width: where Lenis runs. */
export const motionAllowed = "(prefers-reduced-motion: no-preference)";

/** Hover effects need a precise pointer (the hover: variant in globals.css). */
export const hoverCapable = "(hover: hover) and (pointer: fine)";

/** The failsafe of the motion modes (MOTION.md §2.1), in seconds: if no
 *  motion code has started by then, the static page shows. */
export const failsafe = 4;

/** The homepage's sections that move, top down. */
const pageOrder = [
  "hero",
  "intro",
  "featured",
  "selectedWork",
  "editorial",
  "visualStories",
  "fullscreen",
  "about",
  "marquee",
  "contact",
] as const;

/** Every trigger computes in page order whatever order React mounts them in
 *  (MOTION.md §2.4): a higher priority refreshes first, so a pin's spacing is
 *  in place before the triggers below it measure. Ties go top down. */
export const refreshPriority = Object.fromEntries(
  pageOrder.map((section, index) => [section, pageOrder.length - index]),
) as Record<(typeof pageOrder)[number], number>;

/**
 * The hero (MOTION.md §3), in seconds. `load` is the page-load sequence,
 * each step placed `at` its start; the photograph's settle runs from scale
 * 1.08, which globals.css sets before first paint. `scroll` is the desktop
 * pin, its steps lasting a share (`until`) of the pin's progress. `drift`
 * moves the photograph on mobile as the hero leaves the screen.
 */
export const hero = {
  load: {
    photo: { at: 0, duration: 0.8 },
    settle: { at: 0, duration: duration.cinematic },
    headline: { at: 0.4, duration: 1, fromYPercent: 105, stagger: stagger.lines },
    /** The headline waits for the fonts, but starts by this time at the latest. */
    fontsBy: 1.2,
    secondary: { at: 0.95, duration: 0.6 },
  },
  scroll: {
    /** 1px into the scroll: ScrollTrigger moves a pin that would start at 0
     *  to -0.001px, so it is already pinned on load, and the fixed, layered
     *  hero then renders its text unlike the static page (MOTION.md §0). */
    start: "top top-=1",
    end: "+=80%",
    push: { scale: 1.1, yPercent: -3, until: 1 },
    /** The headline rises a tenth of the viewport's height as it fades. */
    headline: { rise: 0.1, until: 0.6 },
    secondary: { until: 0.35 },
  },
  drift: { yPercent: 8 },
} as const;

/** Masked line reveals rise from one line's height below (MOTION.md §2.5). */
export const lineRise = { fromYPercent: 100 } as const;

/*
 * Phase 4, entrances and statements (MOTION.md §4). Ranges are ScrollTrigger
 * start and end positions; inside a scrubbed timeline, steps are [from, to]
 * shares of its progress. Durations, delays and staggers are in seconds.
 * Unless noted, the trigger is the section.
 */

/** §4.1. Desktop scrubs; the lines share the first 80% of the range, one
 *  after another, and the metadata fades in over the last 20%, after the
 *  last line (DESIGN.md §6.02). Mobile plays once. */
export const intro = {
  scrub: { start: "top 80%", end: "top 30%", lines: [0, 0.8], meta: [0.8, 1] },
  once: { start: "top 85%", lines: { duration: 1, stagger: 0.1 }, meta: { duration: 0.6 } },
} as const;

/** §4.2. The trigger is the photograph's frame. The reveal scrubs at every
 *  width: the frame opens from its top edge downward exactly as fast as the
 *  page scrolls, so its moving edge holds on a line 85% down the screen,
 *  from the frame's top reaching that line to its bottom reaching it. On
 *  desktop the photograph also drifts ±6% of its layer's height while it is
 *  on screen. */
export const featured = {
  reveal: {
    start: "top 85%",
    end: "bottom 85%",
    fromClip: "inset(0% 0% 100% 0%)",
    toClip: "inset(0% 0% 0% 0%)",
    fromScale: 1.15,
  },
  caption: { duration: 0.6 },
  drift: { range: 6, start: "top bottom", end: "bottom top" },
} as const;

/** §4.3. Desktop: one scrubbed timeline, which ends as the section's bottom
 *  reaches the screen's, with the whole statement on screen. Line 2 slides
 *  in from one column (and its gutter) to the right. Mobile: the statement
 *  plays once when its top reaches 85% of the screen, its lines 0.12s
 *  apart, and the supporting line when its own top does. */
export const editorial = {
  scrub: {
    start: "top 75%",
    end: "bottom bottom",
    lineOne: [0, 0.3],
    lineTwo: [0.15, 0.45],
    settle: [0.2, 0.8],
    fromScale: 0.97,
    slide: [0.3, 0.8],
    supporting: [0.7, 1],
  },
  once: { start: "top 85%", duration: 1, stagger: 0.12 },
} as const;

/** §4.4. The paragraph plays once; the portrait drifts ±4% across the
 *  section at every width. */
export const about = {
  lines: { start: "top 75%", duration: 0.8, stagger: 0.06 },
  drift: { range: 4, start: "top bottom", end: "bottom top" },
} as const;

/** §4.5. One loop, the width of one copy of the line, plays while the
 *  marquee is on screen. */
export const marquee = { loop: 40, onScreen: { start: "top bottom", end: "bottom top" } } as const;

/** §4.6. Plays once at every width: the lines, then the email as the last
 *  line comes to rest, then the CTA 0.3s after the email starts. */
export const contact = {
  start: "top 70%",
  lines: { duration: 1.2, stagger: 0.18 },
  email: { duration: 0.8 },
  cta: { duration: 0.6, after: 0.3 },
} as const;
