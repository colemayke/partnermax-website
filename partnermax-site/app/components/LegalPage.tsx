import type { ReactNode } from "react";

/* Shared scaffold for the Privacy / Terms / Accessibility pages.
   These are DRAFT placeholders, the prototype shipped these as
   non-navigating "#" links and the README flags the copy as invented.
   The banner makes that unmistakable; PRE-LAUNCH.md tracks replacement.
   Pages using this set robots:noindex so drafts aren't indexed. */
export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="legal">
      <div className="legal__inner">
        <div className="legal__eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <div className="legal__draft" role="note">
          <strong>Draft: not legal advice</strong>
          <p>
            This page is placeholder scaffolding, not a reviewed policy.
            Replace it with copy from PartnerMax&rsquo;s legal counsel before
            launch. See PRE-LAUNCH.md.
          </p>
        </div>
        <div className="legal__body">{children}</div>
        <p className="legal__updated">
          Placeholder · last edited at build time · pending legal review
        </p>
      </div>
    </section>
  );
}
