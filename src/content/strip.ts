import { plates, type Plate } from "./plates";

/*
 * The Visual stories strip on desktop (docs/DESIGN.md §6.06): eight
 * photographs at varied heights, vertical positions and gaps, so the strip
 * reads as a hung sequence rather than a carousel. Neighbours never share a
 * top edge (§4, rule 4). Below 1024px every photograph is about 72vw wide
 * and these values don't apply.
 */

export type StripFrame = {
  readonly plate: Plate;
  /** Height on desktop; the width follows the plate's ratio. At most 66svh,
   *  so the tallest photograph and its caption fit above the progress rule
   *  at 1280×720. */
  readonly height: `${number}svh`;
  /** Where the photograph and its caption sit in the strip's height. */
  readonly align: "start" | "center" | "end";
  /** The space before the photograph, between 4vw and 12vw. */
  readonly gap: `${number}vw`;
};

export const strip: readonly StripFrame[] = [
  { plate: plates.p12, height: "56svh", align: "start", gap: "8vw" },
  { plate: plates.p13, height: "40svh", align: "end", gap: "4vw" },
  { plate: plates.p14, height: "66svh", align: "start", gap: "9vw" },
  { plate: plates.p15, height: "46svh", align: "center", gap: "6vw" },
  { plate: plates.p16, height: "42svh", align: "end", gap: "12vw" },
  { plate: plates.p17, height: "60svh", align: "start", gap: "5vw" },
  { plate: plates.p18, height: "40svh", align: "end", gap: "10vw" },
  { plate: plates.p19, height: "52svh", align: "center", gap: "7vw" },
];
