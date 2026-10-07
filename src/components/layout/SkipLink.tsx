import { copy } from "@/content/copy";

/** The id of every page's <main>: where the skip link lands. */
export const CONTENT_ID = "content";

/** The skip link's own id: Back to top returns focus here. */
export const SKIP_LINK_ID = "skip-link";

/** The first element in the page (docs/DESIGN.md §9). */
export function SkipLink() {
  return (
    <a id={SKIP_LINK_ID} href={`#${CONTENT_ID}`} className="skip-link ui">
      {copy.accessibility.skipToContent}
    </a>
  );
}
