import { Swatch } from "./Swatch";

type Token = { token: string; className: string; use: string };

/* The palette and each token's use, from docs/DESIGN.md §2. Class names are
   written out in full so Tailwind generates them. The paper panel has no
   visible edge, so its content sits on the grid; the dark panel is inset. */
const contexts: { theme: "paper" | "dark"; className: string; tokens: Token[] }[] = [
  {
    theme: "paper",
    className: "lg:col-span-5",
    tokens: [
      { token: "paper", className: "bg-paper", use: "Background" },
      { token: "ink", className: "bg-ink", use: "Primary text" },
      { token: "ink-muted", className: "bg-ink-muted", use: "Metadata, caption details, inactive states" },
      { token: "rule", className: "bg-rule", use: "The two places rules exist; image placeholders" },
      { token: "white", className: "bg-white", use: "Text over photographs only" },
    ],
  },
  {
    theme: "dark",
    className: "self-start p-6 lg:col-span-4",
    tokens: [
      { token: "dark", className: "bg-dark", use: "Background" },
      { token: "dark-ink", className: "bg-dark-ink", use: "Primary text" },
      { token: "dark-muted", className: "bg-dark-muted", use: "Metadata" },
      { token: "dark-rule", className: "bg-dark-rule", use: "Rules" },
    ],
  },
];

/** Both themes, each panel switched by data-theme alone. */
export function Palette() {
  return (
    <>
      {contexts.map(({ theme, className, tokens }) => (
        <div key={theme} data-theme={theme} className={`col-span-full grid gap-8 ${className}`}>
          <p className="ui">{theme}</p>
          <ul className="grid gap-6">
            {tokens.map((token) => (
              <Swatch key={token.token} {...token} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
