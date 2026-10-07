import type { ReactNode } from "react";

type SpecimenSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** A specimen section: its title at cols 1–3, its content on a subgrid at cols 4–12. */
export function SpecimenSection({ id, title, children }: SpecimenSectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="page-grid gap-y-12 py-24">
      <h2 id={headingId} className="display-m col-span-full lg:col-span-3">
        {title}
      </h2>
      <div className="col-span-full grid grid-cols-subgrid gap-y-16 lg:col-start-4 lg:col-end-13">
        {children}
      </div>
    </section>
  );
}
