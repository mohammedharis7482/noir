import { copy } from "@/content/copy";

/** The id of every page's <main>: where the skip link lands. */
export const CONTENT_ID = "content";

/** The first element in the page (docs/DESIGN.md §9). */
export function SkipLink() {
  return (
    <a href={`#${CONTENT_ID}`} className="skip-link ui">
      {copy.accessibility.skipToContent}
    </a>
  );
}
