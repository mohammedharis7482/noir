/*
 * Every word on the site, from docs/DESIGN.md §11. Components never hard-code
 * copy; they read it from here. Captions marked placeholder must be rewritten
 * to match the real photographs once they are curated.
 */

export type Category =
  | "Portrait"
  | "Editorial"
  | "Fashion"
  | "Architecture"
  | "Documentary"
  | "Landscape";

/** A catalogue caption: the title of the work in italic, its details beneath. */
export type Caption = {
  readonly title: string;
  readonly category: Category;
  readonly place?: string;
  readonly year?: number;
};

/** One of the five series in Selected work. */
export type SeriesCopy = Caption & { readonly number: string };

export const copy = {
  nav: {
    wordmark: "NOIR",
    descriptor: "Photography / Visual stories",
    menu: "Menu",
  },

  hero: {
    headline: ["Every frame", "holds a story."],
    meta: ["NOIR / 001", "Contemporary photography"],
    // Placeholder caption.
    caption: {
      title: "Monsoon window",
      category: "Portrait",
      place: "Palakkad",
      year: 2026,
    } satisfies Caption,
  },

  intro: {
    statement: "I photograph light, movement, people and places, and the quiet in between.",
    meta: ["Five series", "2024–2026"],
  },

  featured: {
    // Placeholder caption.
    caption: {
      title: "Low tide",
      category: "Landscape",
      place: "Alappuzha",
      year: 2026,
    } satisfies Caption,
  },

  selectedWork: {
    title: "Selected work",
    years: "2024–2026",
    series: [
      { number: "01", title: "Morning Light", category: "Portrait", place: "Kerala", year: 2026 },
      { number: "02", title: "Between Streets", category: "Documentary", place: "Mumbai", year: 2026 },
      { number: "03", title: "Still Water", category: "Landscape", place: "South India", year: 2026 },
      { number: "04", title: "After Dark", category: "Editorial", year: 2026 },
      { number: "05", title: "Quiet Forms", category: "Architecture", place: "India", year: 2026 },
    ] satisfies readonly SeriesCopy[],
  },

  editorial: {
    statement: ["Photography is not about", "taking pictures."],
    supporting: "I look for the moments between moments.",
  },

  visualStories: {
    title: "Visual stories",
    description: "Portrait, editorial, fashion, architecture and documentary work, 2024–2026.",
    // Placeholder captions in strip order (p12–p19). The real ones are written
    // after curation, as Title, Category / Place / Year; until then only the
    // category from docs/SHOTLIST.md is known.
    captions: [
      { title: "Title", category: "Portrait" },
      { title: "Title", category: "Editorial" },
      { title: "Title", category: "Fashion" },
      { title: "Title", category: "Architecture" },
      { title: "Title", category: "Documentary" },
      { title: "Title", category: "Portrait" },
      { title: "Title", category: "Architecture" },
      { title: "Title", category: "Documentary" },
    ] satisfies readonly Caption[],
  },

  fullscreen: {
    // Placeholder caption.
    caption: {
      title: "Before the rain",
      category: "Landscape",
      place: "Kumbalangi",
      year: 2026,
    } satisfies Caption,
  },

  about: {
    paragraph:
      "NOIR is the working name of an independent photographer based in Kerala. For ten years I have photographed people, streets and coastlines across India, on assignment for editorial clients and, more slowly, for myself. I work in natural light, usually with one camera and one lens, and I am more interested in what happens just before and just after a picture than in the picture itself.",
    facts: [
      { label: "Based", value: "Kerala, India" },
      { label: "Working", value: "India and the Gulf" },
      { label: "Commissions", value: "Editorial, portrait, architecture" },
    ],
  },

  marquee: {
    // Reads "Photography / Portrait / Editorial / Documentary / Architecture /".
    items: ["Photography", "Portrait", "Editorial", "Documentary", "Architecture"],
    separator: "/",
  },

  contact: {
    statement: ["Let’s create", "something worth", "remembering."],
    email: "hello@noir.studio",
    cta: {
      label: "Start a project →",
      href: "mailto:hello@noir.studio?subject=New%20project",
    },
  },

  footer: {
    copyright: "© 2026 NOIR",
    social: ["Instagram", "Behance"],
    backToTop: "Back to top",
  },

  accessibility: {
    skipToContent: "Skip to content",
  },
} as const;

/** Caption details in the catalogue format: "Portrait / Kerala / 2026". */
export function captionDetails(caption: Caption): string {
  return [caption.category, caption.place, caption.year]
    .filter((part) => part !== undefined)
    .join(" / ");
}
