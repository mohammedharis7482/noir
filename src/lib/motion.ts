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

/** Pins compute in page order whatever order React mounts them in
 *  (MOTION.md §2.4): a higher priority refreshes first. */
export const refreshPriority = {
  hero: 4,
  selectedWork: 3,
  visualStories: 2,
  fullscreen: 1,
} as const;

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
