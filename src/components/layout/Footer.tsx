import Link from "next/link";
import { copy } from "@/content/copy";
import { BackToTop } from "./BackToTop";

type FooterProps = {
  /** Dark at the end of the home page's darkroom; paper on /credits (§6.12). */
  theme: "dark" | "paper";
};

const link = "hover:text-fg";

/**
 * §6.11 Footer: one row in meta, fg-muted, its links fg on hover. Below
 * 1024px the four items stack.
 */
export function Footer({ theme }: FooterProps) {
  return (
    <footer
      data-theme={theme}
      className="meta page-grid gap-y-3 pt-[12vh] pb-margin text-fg-muted"
    >
      <p className="col-span-full lg:col-span-3">{copy.footer.copyright}</p>
      <p className="col-span-full lg:col-span-5 lg:col-start-4">
        <a href={copy.footer.builtBy.href} className={link}>
          {copy.footer.builtBy.label}
        </a>
      </p>
      <p className="col-span-full lg:col-span-2 lg:col-start-9">
        <Link href={copy.footer.credits.href} className={link}>
          {copy.footer.credits.label}
        </Link>
      </p>
      <p className="col-span-full lg:col-span-2 lg:col-start-11 lg:justify-self-end">
        <BackToTop className={link} />
      </p>
    </footer>
  );
}
