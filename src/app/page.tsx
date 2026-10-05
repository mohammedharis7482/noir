import { CONTENT_ID } from "@/components/layout/SkipLink";
import { copy } from "@/content/copy";

/** Phase 1: an empty paper page, with the wordmark where the navigation will sit. */
export default function Home() {
  return (
    <>
      <header className="page-grid h-16 items-center">
        <p className="wordmark">{copy.nav.wordmark}</p>
      </header>
      <main id={CONTENT_ID} tabIndex={-1} />
    </>
  );
}
