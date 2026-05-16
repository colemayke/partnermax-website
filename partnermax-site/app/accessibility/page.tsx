import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "PartnerMax accessibility statement (draft placeholder).",
  robots: { index: false, follow: false },
};

export default function AccessibilityPage() {
  return (
    <LegalPage eyebrow="Legal" title="Accessibility">
      <p>
        PartnerMax is committed to making this site usable for everyone,
        including people who rely on assistive technology. This is a draft
        statement pending a formal audit.
      </p>

      <h2>What we&rsquo;ve built in</h2>
      <ul>
        <li>Semantic landmarks, a single H1 per page, and a skip-to-content link.</li>
        <li>Real <code>&lt;button&gt;</code> controls for the FAQ with <code>aria-expanded</code>.</li>
        <li>
          Labelled form fields with native validation and visible focus rings.
        </li>
        <li>
          All motion (reveals, parallax, marquees, cursor) honours{" "}
          <code>prefers-reduced-motion</code>.
        </li>
        <li>Colour contrast on red-on-dark and ink-on-light targets WCAG AA.</li>
      </ul>

      <h2>Known gaps</h2>
      <p>
        A full WCAG 2.2 AA audit, keyboard-only pass and screen-reader test
        across NVDA / VoiceOver are still outstanding (tracked in
        PRE-LAUNCH.md).
      </p>

      <h2>Contact</h2>
      <p>
        Found a barrier? Email{" "}
        <a href="mailto:hello@partnermax.ca">hello@partnermax.ca</a> and
        we&rsquo;ll prioritise a fix.
      </p>
    </LegalPage>
  );
}
