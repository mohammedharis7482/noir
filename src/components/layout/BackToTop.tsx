"use client";

import type { MouseEvent } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { copy } from "@/content/copy";
import { SKIP_LINK_ID } from "./SkipLink";

/**
 * §6.11 Back to top: scrolls to the top with Lenis when it runs, natively
 * and instantly under reduced motion, and moves focus to the skip link so
 * the next Tab starts from the top of the page. Without JavaScript, the
 * #top fragment still scrolls the page to the top.
 */
export function BackToTop({ className }: { className?: string }) {
  const lenis = useLenis();

  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo(0, 0);
    // The skip link lives in the root layout, outside this component's tree.
    document.getElementById(SKIP_LINK_ID)?.focus({ preventScroll: true });
  };

  return (
    <a href="#top" onClick={toTop} className={className}>
      {copy.footer.backToTop}
    </a>
  );
}
