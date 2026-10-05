import { copy, type Caption } from "./copy";

/*
 * The 21 photographs (docs/SHOTLIST.md). Each file lives in
 * public/images/plates under the name below; a missing file renders as the
 * NoirImage placeholder. Alt text and captions are placeholders until the
 * photographs are curated: rewrite them to describe the photograph chosen.
 */

/** URL path of public/images/plates. */
export const PLATE_DIRECTORY = "/images/plates";

/** The crops in use (DESIGN.md §5), as CSS aspect-ratio values. */
export const ratios = {
  "4:5": "4 / 5",
  "3:4": "3 / 4",
  "2:3": "2 / 3",
  "3:2": "3 / 2",
  "16:9": "16 / 9",
  "21:9": "21 / 9",
} as const;

export type Ratio = keyof typeof ratios;

export const plateIds = [
  "p01", "p02", "p03", "p04", "p05", "p06", "p07",
  "p08", "p09", "p10", "p11", "p12", "p13", "p14",
  "p15", "p16", "p17", "p18", "p19", "p20", "p21",
] as const;

export type PlateId = (typeof plateIds)[number];

export type PlateRole =
  | "hero"
  | "featured"
  | "series-main"
  | "series-support"
  | "strip"
  | "fullscreen"
  | "about";

export type Plate<Id extends PlateId = PlateId> = {
  readonly id: Id;
  /** File name in public/images/plates. */
  readonly file: `${Id}-${string}.jpg`;
  readonly role: PlateRole;
  /** The crop the composition uses; NoirImage's ratio prop can override it. */
  readonly ratio: Ratio;
  /** Describes the photograph, never its role. */
  readonly alt: string;
  /** The About portrait is the only plate shown without a caption. */
  readonly caption?: Caption;
};

const [morningLight, betweenStreets, stillWater, afterDark, quietForms] =
  copy.selectedWork.series;
const strip = copy.visualStories.captions;

export const plates: { readonly [Id in PlateId]: Plate<Id> } = {
  // Hero, featured and fullscreen
  p01: {
    id: "p01",
    file: "p01-hero.jpg",
    role: "hero",
    ratio: "3:2", // 4:5 on mobile, set by the composition
    alt: "A person standing in a doorway in soft monsoon light, looking away from the camera",
    caption: copy.hero.caption,
  },
  p02: {
    id: "p02",
    file: "p02-featured.jpg",
    role: "featured",
    ratio: "3:2",
    alt: "A wide, hazy shoreline at low tide with a few small boats far out on the water",
    caption: copy.featured.caption,
  },
  p20: {
    id: "p20",
    file: "p20-fullscreen.jpg",
    role: "fullscreen",
    ratio: "16:9", // 4:5 on mobile, set by the composition
    alt: "A lone figure in a wide, flat landscape under a heavy sky before rain",
    caption: copy.fullscreen.caption,
  },

  // Selected work: five series
  p03: {
    id: "p03",
    file: "p03-morning-light.jpg",
    role: "series-main",
    ratio: "4:5",
    alt: "A portrait lit by low, warm morning light falling from one side",
    caption: morningLight,
  },
  p04: {
    id: "p04",
    file: "p04-morning-light-detail.jpg",
    role: "series-support",
    ratio: "3:2",
    alt: "Morning light falling across folded hands and the fabric of a sleeve",
    caption: morningLight,
  },
  p05: {
    id: "p05",
    file: "p05-between-streets.jpg",
    role: "series-main",
    ratio: "3:2",
    alt: "A crowded street in layers, people moving past shopfronts and traffic",
    caption: betweenStreets,
  },
  p06: {
    id: "p06",
    file: "p06-between-streets-detail.jpg",
    role: "series-support",
    ratio: "3:4",
    alt: "A long shadow stretching across a narrow doorway",
    caption: betweenStreets,
  },
  p07: {
    id: "p07",
    file: "p07-still-water.jpg",
    role: "series-main",
    ratio: "16:9",
    alt: "Calm backwaters under a low horizon, almost without colour",
    caption: stillWater,
  },
  p08: {
    id: "p08",
    file: "p08-after-dark.jpg",
    role: "series-main",
    ratio: "4:5",
    alt: "A portrait at night, lit by the warm light of a shop sign",
    caption: afterDark,
  },
  p09: {
    id: "p09",
    file: "p09-after-dark-detail.jpg",
    role: "series-support",
    ratio: "3:2",
    alt: "Lit signage reflected in a wet road at night",
    caption: afterDark,
  },
  p10: {
    id: "p10",
    file: "p10-quiet-forms.jpg",
    role: "series-main",
    ratio: "2:3",
    alt: "A concrete stair climbing into deep shadow",
    caption: quietForms,
  },
  p11: {
    id: "p11",
    file: "p11-quiet-forms-wide.jpg",
    role: "series-support",
    ratio: "3:2",
    alt: "A concrete building with strong repeating geometry, seen from across a street",
    caption: quietForms,
  },

  // Visual stories: the horizontal strip
  p12: {
    id: "p12",
    file: "p12-portrait.jpg",
    role: "strip",
    ratio: "3:4",
    alt: "A person standing in their workshop among the tools of their trade",
    caption: strip[0],
  },
  p13: {
    id: "p13",
    file: "p13-editorial.jpg",
    role: "strip",
    ratio: "3:2",
    alt: "A market at opening time, the first stalls being set out",
    caption: strip[1],
  },
  p14: {
    id: "p14",
    file: "p14-fashion.jpg",
    role: "strip",
    ratio: "2:3",
    alt: "A model in a long dress walking down a sunlit street",
    caption: strip[2],
  },
  p15: {
    id: "p15",
    file: "p15-architecture.jpg",
    role: "strip",
    ratio: "4:5",
    alt: "An empty interior crossed by bands of sunlight and shadow",
    caption: strip[3],
  },
  p16: {
    id: "p16",
    file: "p16-documentary.jpg",
    role: "strip",
    ratio: "3:2",
    alt: "Fishermen hauling a net up the beach in early light",
    caption: strip[4],
  },
  p17: {
    id: "p17",
    file: "p17-portrait.jpg",
    role: "strip",
    ratio: "4:5",
    alt: "A close, quiet portrait in soft window light",
    caption: strip[5],
  },
  p18: {
    id: "p18",
    file: "p18-architecture.jpg",
    role: "strip",
    ratio: "16:9",
    alt: "A long facade built from one repeating window pattern",
    caption: strip[6],
  },
  p19: {
    id: "p19",
    file: "p19-documentary.jpg",
    role: "strip",
    ratio: "3:4",
    alt: "Two people sharing a quiet moment on a crowded station platform",
    caption: strip[7],
  },

  // About
  p21: {
    id: "p21",
    file: "p21-about.jpg",
    role: "about",
    ratio: "3:4",
    alt: "A photographer seen from behind, holding a camera at their side",
  },
};

/** The photograph's URL under public/. */
export function plateSrc(plate: Plate): string {
  return `${PLATE_DIRECTORY}/${plate.file}`;
}
