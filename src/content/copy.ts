/*
 * Every word on the site, from docs/DESIGN.md §11. Components never hard-code
 * copy; they read it from here. Captions describe the photographs now in
 * public/images/plates; when a temporary plate is replaced (docs/SHOTLIST.md),
 * rewrite its caption to match the new photograph.
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

/** Mohammed Haris on GitHub: linked from the footer and from /credits. */
const BUILT_BY_HREF = "https://github.com/mohammedharis7482";

export const copy = {
  nav: {
    wordmark: "NOIR",
    descriptor: "Photography / Visual stories",
    menu: "Menu",
  },

  hero: {
    headline: ["Every frame", "holds a story."],
    meta: ["NOIR / 001", "Contemporary photography"],
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
    // In strip order, p12–p19.
    captions: [
      { title: "Blue doorway", category: "Portrait", place: "Jodhpur", year: 2025 },
      { title: "First catch", category: "Editorial", place: "Chennai", year: 2025 },
      { title: "Kasavu", category: "Fashion", place: "Fort Kochi", year: 2026 },
      { title: "Four o’clock", category: "Architecture", place: "Ahmedabad", year: 2024 },
      { title: "Evening haul", category: "Documentary", place: "Kollam", year: 2024 },
      { title: "Green shawl", category: "Portrait", place: "Thrissur", year: 2025 },
      { title: "Brise-soleil", category: "Architecture", place: "Chandigarh", year: 2024 },
      { title: "Looking up", category: "Documentary", place: "Howrah", year: 2026 },
    ] satisfies readonly Caption[],
  },

  fullscreen: {
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
    // The portrait's caption appears only in the list of plates on /credits;
    // in About the portrait stands without one (§6.08).
    caption: {
      title: "Self-portrait",
      category: "Portrait",
      place: "Kerala",
      year: 2026,
    } satisfies Caption,
  },

  marquee: {
    // Reads "Photography / Portrait / Editorial / Documentary / Architecture /".
    items: ["Photography", "Portrait", "Editorial", "Documentary", "Architecture"],
    separator: "/",
  },

  contact: {
    statement: ["Let’s create", "something worth", "remembering."],
    email: {
      label: "hello@noir.studio",
      href: "mailto:hello@noir.studio",
    },
    cta: {
      label: "Start a project →",
      href: "mailto:hello@noir.studio?subject=New%20project",
    },
  },

  footer: {
    copyright: "© 2026 NOIR",
    builtBy: {
      label: "Designed and built by Mohammed Haris",
      href: BUILT_BY_HREF,
    },
    credits: {
      label: "Notes and credits",
      href: "/credits",
    },
    backToTop: "Back to top",
  },

  credits: {
    // The h1, and the browser tab's "Notes and credits / NOIR" through the
    // root layout's title template.
    title: "Notes and credits",
    description: "Notes on NOIR, a concept photography site, and the list of its 21 plates.",
    // Two paragraphs: the concept, then the colophon, in which "Mohammed
    // Haris" links to GitHub, as in the footer.
    concept:
      "NOIR is a concept site. The photographer and the studio are fictional, and every photograph here was generated with AI (ChatGPT) for this project.",
    colophon: {
      before: "Designed and built by ",
      link: { label: "Mohammed Haris", href: BUILT_BY_HREF },
      after: ". Set in Instrument Serif and Hanken Grotesk. Built with Next.js, GSAP and Lenis.",
    },
    plates: {
      title: "List of plates",
      // Follows the series title, in roman, for a support photograph without
      // a caption of its own: "Morning Light (detail)".
      detail: "(detail)",
    },
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
