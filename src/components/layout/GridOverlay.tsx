"use client";

import { useEffect, useState } from "react";

/** Columns beyond the mobile four show from the breakpoint that adds them. */
const COLUMNS = Array.from({ length: 12 }, (_, index) =>
  index < 4 ? "block" : index < 8 ? "hidden sm:block" : "hidden lg:block",
);

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))
  );
}

/** Dev tool (DESIGN.md §4): the g key shows the page grid's columns. */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "g" || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
      setVisible((current) => !current);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-90">
      <div className="page-grid h-full">
        {COLUMNS.map((visibility, index) => (
          <span key={index} className={`${visibility} bg-ink-muted/15`} />
        ))}
      </div>
    </div>
  );
}
