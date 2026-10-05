import { captionDetails, copy } from "@/content/copy";

type Role = {
  name: string;
  /** Face / size / line height / tracking, as specified in docs/DESIGN.md §3. */
  spec: string;
  /** A literal utility class, so Tailwind generates it. */
  className: string;
  /** Real NOIR copy, one entry per line. */
  lines: readonly string[];
};

const roles: Role[] = [
  {
    name: "display-xl",
    spec: "Instrument Serif / clamp(3.5rem, 10vw, 12rem) / 0.9 / -0.02em",
    className: "display-xl",
    lines: copy.hero.headline,
  },
  {
    name: "display-l",
    spec: "Instrument Serif / clamp(2.5rem, 6vw, 6.5rem) / 0.98 / -0.015em",
    className: "display-l",
    lines: [copy.intro.statement],
  },
  {
    name: "display-m",
    spec: "Instrument Serif / clamp(2rem, 3.6vw, 3.75rem) / 1.05 / -0.01em",
    className: "display-m",
    lines: [copy.contact.email],
  },
  {
    name: "text-l",
    spec: "Instrument Serif / clamp(1.5rem, 2.2vw, 2.25rem) / 1.25 / 0 / 34ch",
    className: "text-l",
    lines: [copy.about.paragraph],
  },
  {
    name: "caption-title",
    spec: "Instrument Serif italic / 21px / 1.2 / 0",
    className: "caption-title",
    lines: [copy.hero.caption.title],
  },
  {
    name: "body",
    spec: "Hanken Grotesk 400 / 16px / 1.55 / 0 / 60ch",
    className: "body",
    lines: [copy.about.paragraph],
  },
  {
    name: "meta",
    spec: "Hanken Grotesk 400 / 13px / 1.4 / 0.01em",
    className: "meta",
    lines: [captionDetails(copy.hero.caption)],
  },
  {
    name: "ui",
    spec: "Hanken Grotesk 500 / 13px / 1 / 0.02em",
    className: "ui",
    lines: [copy.contact.cta.label],
  },
  {
    name: "wordmark",
    spec: "Hanken Grotesk 500 / 13px / 1 / 0.2em",
    className: "wordmark",
    lines: [copy.nav.wordmark],
  },
];

/** Every type role, set in real NOIR copy. */
export function TypeRoles() {
  return (
    <ul className="col-span-full grid gap-16">
      {roles.map((role) => (
        <li key={role.name} className="grid gap-4">
          <p className="meta text-fg-muted">
            <span className="text-fg">{role.name}</span> / {role.spec}
          </p>
          <p className={role.className}>
            {role.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
