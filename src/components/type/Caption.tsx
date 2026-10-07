import { captionDetails, type Caption as CaptionCopy } from "@/content/copy";

type CaptionProps = {
  caption: CaptionCopy;
  /** figcaption inside a figure; a div where the caption stands apart from
   *  its photograph, as in the hero. */
  as?: "figcaption" | "div";
  /** The edge the text itself meets: the title's capitals at the top, or
   *  the details' baseline at the bottom (globals.css, optical alignment). */
  trim?: "top" | "bottom";
  className?: string;
};

/**
 * A catalogue caption (docs/DESIGN.md §1): the title of the work in italic
 * serif, its details in small sans beneath.
 */
export function Caption({ caption, as: Tag = "div", trim, className }: CaptionProps) {
  return (
    <Tag className={className}>
      <p className={trim === "top" ? "caption-title trim-cap" : "caption-title"}>
        {caption.title}
      </p>
      <p className={trim === "bottom" ? "meta trim-baseline text-fg-muted" : "meta text-fg-muted"}>
        {captionDetails(caption)}
      </p>
    </Tag>
  );
}
