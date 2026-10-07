import Link from "next/link";
import { copy } from "@/content/copy";

/**
 * §6.00 Navigation: the wordmark, the descriptor and Menu in a 64px band
 * laid over the top of the page, with no background. Static for now: hiding
 * on scroll, following the colour of the section beneath and the menu
 * itself come in Phase 8. Below 1024px: wordmark and Menu only.
 */
export function Navigation() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav aria-label="Main" className="page-grid h-nav items-center">
        <Link href="/" className="wordmark justify-self-start">
          {copy.nav.wordmark}
        </Link>
        <p className="meta col-span-4 col-start-5 text-fg-muted max-lg:hidden">
          {copy.nav.descriptor}
        </p>
        <button type="button" className="ui -col-end-1 justify-self-end">
          {copy.nav.menu}
        </button>
      </nav>
    </header>
  );
}
