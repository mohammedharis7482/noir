"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, ease, lineRise, motionAllowed, refreshPriority } from "@/lib/motion";
import { claimMotion } from "@/lib/motion-mode";
import { playOnce } from "@/lib/reveal";

/**
 * Contact's section, with its slow sequenced reveal (MOTION.md §4.6)
 * around the static content Contact renders, at every width: the
 * statement's lines rise, the email fades in as the last one comes to rest,
 * and the CTA follows. Tabbing to the email or the CTA before then finishes
 * the reveal at once.
 */
export function ContactMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !claimMotion()) return;

      const q = gsap.utils.selector(section);
      const [statement] = q("[data-lines]");
      const [email, cta] = q("[data-fade]");
      const mm = gsap.matchMedia();

      mm.add(motionAllowed, () =>
        playOnce({
          text: statement,
          trigger: section,
          start: contact.start,
          refreshPriority: refreshPriority.contact,
          section,
          build: (timeline, split) =>
            timeline
              .fromTo(
                split.lines,
                { yPercent: lineRise.fromYPercent },
                { yPercent: 0, duration: contact.lines.duration, stagger: contact.lines.stagger, ease: ease.out },
              )
              .fromTo(email, { opacity: 0 }, { opacity: 1, duration: contact.email.duration, ease: ease.out })
              .fromTo(
                cta,
                { opacity: 0 },
                { opacity: 1, duration: contact.cta.duration, ease: ease.out },
                `<${contact.cta.after}`,
              ),
        }),
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
