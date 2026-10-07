import { copy } from "@/content/copy";

const [lineOne, lineTwo, lineThree] = copy.contact.statement;

/**
 * §6.10 Contact, at rest: the statement in three lines, the middle one
 * indented a column, then the email and the CTA at cols 7–12. Both are
 * mailto links; the CTA's carries the subject line. Their hover details
 * come in Phase 8. Below 640px display-xl follows the width (11vw) under
 * its 3.5rem floor, so "something worth" still fits on one line after its
 * indent (§12, row 26).
 */
export function Contact() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="contact-title"
      className="page-grid pt-[24vh] pb-[20vh]"
    >
      <h2
        id="contact-title"
        className="display-xl col-span-full max-sm:[--display-xl-size:min(11vw,3.5rem)]"
      >
        <span className="block">{lineOne}</span>
        <span className="indent-column block">{lineTwo}</span>
        <span className="block">{lineThree}</span>
      </h2>
      <div className="col-span-full mt-16 lg:col-span-6 lg:col-start-7">
        <p className="display-m">
          <a href={copy.contact.email.href}>{copy.contact.email.label}</a>
        </p>
        <p className="ui mt-6">
          <a href={copy.contact.cta.href}>{copy.contact.cta.label}</a>
        </p>
      </div>
    </section>
  );
}
