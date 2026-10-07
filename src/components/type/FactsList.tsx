import type { ReactNode } from "react";

/** One row: a term, such as a fact's label or a plate's number, and what it describes. */
export type Fact = {
  /** Stable key for the row. */
  readonly id: string;
  readonly term: ReactNode;
  readonly descriptions: readonly ReactNode[];
};

type FactsListProps = {
  facts: readonly Fact[];
  /** Type and column classes for the term's cell. */
  termClassName: string;
  /** Type and column classes for each description's cell, in order. */
  descriptionClassNames: readonly string[];
  /** Placement on the parent grid, which the list's columns follow. */
  className?: string;
};

/**
 * A facts list (docs/DESIGN.md §4): rows with a 1px rule between them, and
 * none above the first row or below the last. About's facts and the list of
 * plates on /credits. The list and each row are subgrids, so every cell
 * sits on the page grid's columns, and the cells of a row share a baseline.
 */
export function FactsList({ facts, termClassName, descriptionClassNames, className }: FactsListProps) {
  return (
    <dl
      className={["grid grid-cols-subgrid divide-y divide-line", className]
        .filter(Boolean)
        .join(" ")}
    >
      {facts.map((fact) => (
        <div
          key={fact.id}
          className="col-span-full grid grid-cols-subgrid items-baseline py-3 first:pt-0 last:pb-0"
        >
          <dt className={termClassName}>{fact.term}</dt>
          {fact.descriptions.map((description, index) => (
            <dd key={index} className={descriptionClassNames[index]}>
              {description}
            </dd>
          ))}
        </div>
      ))}
    </dl>
  );
}
