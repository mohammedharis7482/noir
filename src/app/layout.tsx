import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { copy } from "@/content/copy";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const hankenGrotesk = Hanken_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: copy.nav.wordmark,
    template: `%s / ${copy.nav.wordmark}`,
  },
  description: copy.intro.statement,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="paper"
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable}`}
    >
      <body>
        <SkipLink />
        <SmoothScroll>{children}</SmoothScroll>
        {/* Dev tool: GridOverlay decides which pages respond to the g key. */}
        <GridOverlay />
      </body>
    </html>
  );
}
