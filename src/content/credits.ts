import type { PlateId } from "./plates";

/*
 * Photographer and source for every plate (docs/DESIGN.md §5). Fill each
 * entry in when its photograph is chosen (docs/SHOTLIST.md, "Technical").
 */

export type Credit = {
  /** The photographer's name as it appears on their profile. */
  readonly photographer: string;
  /** The photograph's page on Unsplash or Pexels. */
  readonly source: string;
};

export const credits: { readonly [Id in PlateId]: Credit } = {
  p01: { photographer: "", source: "" },
  p02: { photographer: "", source: "" },
  p03: { photographer: "", source: "" },
  p04: { photographer: "", source: "" },
  p05: { photographer: "", source: "" },
  p06: { photographer: "", source: "" },
  p07: { photographer: "", source: "" },
  p08: { photographer: "", source: "" },
  p09: { photographer: "", source: "" },
  p10: { photographer: "", source: "" },
  p11: { photographer: "", source: "" },
  p12: { photographer: "", source: "" },
  p13: { photographer: "", source: "" },
  p14: { photographer: "", source: "" },
  p15: { photographer: "", source: "" },
  p16: { photographer: "", source: "" },
  p17: { photographer: "", source: "" },
  p18: { photographer: "", source: "" },
  p19: { photographer: "", source: "" },
  p20: { photographer: "", source: "" },
  p21: { photographer: "", source: "" },
};
