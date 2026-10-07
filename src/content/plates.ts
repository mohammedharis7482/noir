import { copy, type Caption } from "./copy";
import { plateFiles } from "./plate-files";

/*
 * The 21 photographs (docs/SHOTLIST.md). Each file lives in
 * public/images/plates under the name below; a missing file renders as the
 * NoirImage placeholder. Most plates are temporary (docs/SHOTLIST.md,
 * "Temporary plates"): when one is replaced, rewrite its alt text to
 * describe the new photograph.
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
  /** Every plate has one, for the list of plates on /credits. The About
   *  portrait is the only plate shown without its caption on the home page. */
  readonly caption: Caption;
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
    alt: "A young man in a dark shirt leans against a tall window, looking out through rain-streaked glass at misty hills and palm trees",
    caption: copy.hero.caption,
  },
  p02: {
    id: "p02",
    file: "p02-featured.jpg",
    role: "featured",
    ratio: "3:2",
    alt: "Four figures stand by a small boat far out on wet sand at low tide, under a hazy sun with palms along the horizon",
    caption: copy.featured.caption,
  },
  p20: {
    id: "p20",
    file: "p20-fullscreen.jpg",
    role: "fullscreen",
    ratio: "16:9", // 4:5 on mobile, set by the composition
    alt: "A lone man poles a narrow canoe across wide, still backwaters under a dark storm sky, with palms along the far shore",
    caption: copy.fullscreen.caption,
  },

  // Selected work: five series
  p03: {
    id: "p03",
    file: "p03-morning-light.jpg",
    role: "series-main",
    ratio: "4:5",
    alt: "An older woman with grey hair, in a cream saree, sits in warm side light against a dark room, gazing to one side",
    caption: morningLight,
  },
  p04: {
    id: "p04",
    file: "p04-morning-light-detail.jpg",
    role: "series-support",
    ratio: "3:2",
    alt: "Close-up of weathered hands with a thin gold bangle folding a white cloth on a wooden table in warm light",
    caption: morningLight,
  },
  p05: {
    id: "p05",
    file: "p05-between-streets.jpg",
    role: "series-main",
    ratio: "3:2",
    alt: "A crowded street of old colonial buildings at sunset, with a domed tower in the distance, a man pushing a handcart and a red bus passing in a blur",
    caption: betweenStreets,
  },
  p06: {
    id: "p06",
    file: "p06-between-streets-detail.jpg",
    role: "series-support",
    ratio: "3:4",
    alt: "A man on a stool drinks tea at a blue roadside stall in morning sun, while another man walks past and a blurred figure crosses the foreground",
    caption: betweenStreets,
  },
  p07: {
    id: "p07",
    file: "p07-still-water.jpg",
    role: "series-main",
    ratio: "16:9",
    alt: "In black and white, four figures stand by a small boat far out on wet sand at low tide, under a low sun",
    caption: stillWater,
  },
  p08: {
    id: "p08",
    file: "p08-after-dark.jpg",
    role: "series-main",
    ratio: "4:5",
    alt: "A young woman in a dark dress stands on a street at night beside a lit shop window, her face warm in its light",
    caption: afterDark,
  },
  p09: {
    id: "p09",
    file: "p09-after-dark-detail.jpg",
    role: "series-support",
    ratio: "3:2",
    alt: "A wet street at night, with two lit windows in an old building and a street lamp reflected on the asphalt",
    caption: afterDark,
  },
  p10: {
    id: "p10",
    file: "p10-quiet-forms.jpg",
    role: "series-main",
    ratio: "2:3",
    alt: "A bare concrete wall in raking light beside a narrow stair whose thin handrail climbs into shadow",
    caption: quietForms,
  },
  p11: {
    id: "p11",
    file: "p11-quiet-forms-wide.jpg",
    role: "series-support",
    ratio: "3:2",
    alt: "A long concrete building with tall vertical fins under a pale sky, with a single person walking past its base",
    caption: quietForms,
  },

  // Visual stories: the horizontal strip
  p12: {
    id: "p12",
    file: "p12-portrait.jpg",
    role: "strip",
    ratio: "3:4",
    alt: "A bearded man in a cream head wrap leans in the blue doorway of a market stall, looking out to one side, with baskets hanging behind him",
    caption: strip[0],
  },
  p13: {
    id: "p13",
    file: "p13-editorial.jpg",
    role: "strip",
    ratio: "3:2",
    alt: "Workers sort fish into plastic crates under the tin roof of a harbour market at sunrise, with a ship hazy in the distance",
    caption: strip[1],
  },
  p14: {
    id: "p14",
    file: "p14-fashion.jpg",
    role: "strip",
    ratio: "2:3",
    alt: "A young woman in a sheer cream saree stands by a weathered stone wall beneath palm trees, looking away to one side",
    caption: strip[2],
  },
  p15: {
    id: "p15",
    file: "p15-architecture.jpg",
    role: "strip",
    ratio: "4:5",
    alt: "Sunlight falls in diagonal bands across bare concrete walls and a stair, with a low dark bench in the foreground",
    caption: strip[3],
  },
  p16: {
    id: "p16",
    file: "p16-documentary.jpg",
    role: "strip",
    ratio: "3:2",
    alt: "Six fishermen in silhouette haul a net from a wooden boat at sunset, the sun low over the water behind them",
    caption: strip[4],
  },
  p17: {
    id: "p17",
    file: "p17-portrait.jpg",
    role: "strip",
    ratio: "4:5",
    alt: "A young woman with her hair tied back looks down in soft side light, a dark green shawl around her shoulders",
    caption: strip[5],
  },
  p18: {
    id: "p18",
    file: "p18-architecture.jpg",
    role: "strip",
    ratio: "16:9",
    alt: "Tall concrete fins line the facade of a modern building against a clear blue sky, with a small tree in front",
    caption: strip[6],
  },
  p19: {
    id: "p19",
    file: "p19-documentary.jpg",
    role: "strip",
    ratio: "3:4",
    alt: "A schoolboy with a backpack looks up on a busy railway platform, a red and cream train standing behind him",
    caption: strip[7],
  },

  // About
  p21: {
    id: "p21",
    file: "p21-about.jpg",
    role: "about",
    ratio: "3:4",
    alt: "A man seen from behind stands on a wet beach at dusk with a camera in one hand, facing the waves",
    caption: copy.about.caption,
  },
};

/** The photograph's URL under public/. */
export function plateSrc(plate: Plate): string {
  return `${PLATE_DIRECTORY}/${plate.file}`;
}

const filesPresent = new Set(plateFiles);

/** Whether the photograph is in public/images/plates, according to the
 *  manifest scripts/plate-manifest.mjs writes before dev and build. */
export function hasPlateFile(plate: Plate): boolean {
  return filesPresent.has(plate.file);
}
