import { copy, type SeriesCopy } from "./copy";
import { plates, type Plate, type Ratio } from "./plates";

/*
 * The five series of Selected work and their frame presets (docs/DESIGN.md
 * §6.04). The presets give the pinned story its rhythm: large, small,
 * quiet, large, unexpected. Columns refer to the 12-column desktop grid;
 * below 1024px every series stacks and the support photographs are omitted.
 */

/** A photograph's frame on the desktop stage. */
export type Frame = {
  readonly plate: Plate;
  readonly ratio: Ratio;
  /** First and last grid column, inclusive: cols 6–10 is [6, 10]. */
  readonly cols: readonly [first: number, last: number];
  /** Runs off the right edge of the viewport. */
  readonly bleedsRight?: boolean;
  /**
   * Where the frame sits on the stage. Photographs hang from the same two
   * lines as the stage's type, 12svh in from the top (the index) and from
   * the bottom (the title's baseline). Without a placement, a frame is
   * centred.
   * - high: its top edge on the upper line
   * - lower: its bottom edge on the lower line
   * - overlaps-main-lower-left: over the main photograph's lower-left
   *   corner, its bottom edge `shift` below the lower line
   */
  readonly placement?: "lower" | "high" | "overlaps-main-lower-left";
  /** How far an overlapping frame hangs below the lower line. */
  readonly shift?: `${number}svh`;
  /** A fixed height where the preset names one; the width stays on the columns. */
  readonly height?: `${number}svh`;
  /** The crop, as an object-position value, where the frame cuts the photograph. */
  readonly focal?: string;
};

export type Series = {
  /** Stable key, and the path of a future project page (/work/morning-light). */
  readonly slug: string;
  readonly copy: SeriesCopy;
  readonly feel: "large" | "small" | "quiet" | "unexpected";
  readonly main: Frame;
  readonly support: Frame | null;
};

const [morningLight, betweenStreets, stillWater, afterDark, quietForms] =
  copy.selectedWork.series;

export const series: readonly Series[] = [
  {
    slug: "morning-light",
    copy: morningLight,
    feel: "large",
    // 4:5 across cols 6–10 is about 76svh on a 16:10 screen. Fixing it there
    // keeps After Dark (82svh) the taller one on 16:9 screens too, and,
    // centred, its edges are the stage's two lines (12svh in).
    main: { plate: plates.p03, ratio: "4:5", cols: [6, 10], height: "76svh" },
    support: {
      plate: plates.p04,
      ratio: "3:2",
      cols: [11, 12],
      placement: "lower",
      bleedsRight: true,
    },
  },
  {
    slug: "between-streets",
    copy: betweenStreets,
    feel: "small",
    main: { plate: plates.p05, ratio: "3:2", cols: [7, 11] },
    support: {
      plate: plates.p06,
      ratio: "3:4",
      cols: [5, 6],
      placement: "high",
      focal: "30% 50%",
    },
  },
  {
    slug: "still-water",
    copy: stillWater,
    feel: "quiet",
    main: { plate: plates.p07, ratio: "16:9", cols: [6, 12], bleedsRight: true },
    support: null,
  },
  {
    slug: "after-dark",
    copy: afterDark,
    feel: "large",
    main: { plate: plates.p08, ratio: "4:5", cols: [7, 11], height: "82svh", focal: "60% 50%" },
    support: {
      plate: plates.p09,
      ratio: "3:2",
      cols: [5, 7],
      placement: "overlaps-main-lower-left",
      // 4svh below the main photograph's bottom edge (91svh).
      shift: "7svh",
    },
  },
  {
    // The hierarchy flips: the support photograph, centred, is larger than
    // the main, which hangs from the lower line beside it.
    slug: "quiet-forms",
    copy: quietForms,
    feel: "unexpected",
    main: {
      plate: plates.p10,
      ratio: "2:3",
      cols: [10, 11],
      placement: "lower",
      focal: "60% 50%",
    },
    support: { plate: plates.p11, ratio: "3:2", cols: [4, 8] },
  },
];
