import type { PlateId } from "./plates";

/*
 * Photographer and source for every plate (docs/DESIGN.md §5), shown on
 * /credits. The current plates were generated with AI and have no
 * photographer (DESIGN.md §12); when a plate is replaced with a photograph
 * (docs/SHOTLIST.md, "Temporary plates"), give it its own entry.
 */

export type Credit = {
  /** The photographer's name as it appears on their profile, when there is one. */
  readonly photographer?: string;
  /** Where the image comes from: the photograph's page on Unsplash or
   *  Pexels, or how it was made. */
  readonly source: string;
};

const generated: Credit = { source: "Generated with AI (ChatGPT)" };

export const credits: { readonly [Id in PlateId]: Credit } = {
  p01: generated,
  p02: generated,
  p03: generated,
  p04: generated,
  p05: generated,
  p06: generated,
  p07: generated,
  p08: generated,
  p09: generated,
  p10: generated,
  p11: generated,
  p12: generated,
  p13: generated,
  p14: generated,
  p15: generated,
  p16: generated,
  p17: generated,
  p18: generated,
  p19: generated,
  p20: generated,
  p21: generated,
};
