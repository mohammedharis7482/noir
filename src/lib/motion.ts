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
