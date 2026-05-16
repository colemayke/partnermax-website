import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "PartnerMax privacy policy (draft placeholder).",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy policy">
      <p>
        PartnerMax Inc. (&ldquo;PartnerMax&rdquo;, &ldquo;we&rdquo;) describes
        here how we collect, use and protect information from visitors and
        prospective partners. This draft is structured as a starting point only.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          Contact details you submit through the inquiry form (name, business,
          email, area of interest, optional notes).
        </li>
        <li>Standard server and analytics logs once analytics is enabled.</li>
      </ul>

      <h2>How we use it</h2>
      <p>
        To respond to partnership inquiries, scope and quote services, and
        operate the relationship. We do not sell personal information.
      </p>

      <h2>Sharing</h2>
      <p>
        Inquiry data is processed by our email provider (Resend) to deliver it
        to the channel team, and shared with Rogers only as required to
        provision the services you request.
      </p>

      <h2>Retention &amp; your rights</h2>
      <p>
        Canadian privacy law (PIPEDA, and applicable provincial legislation)
        governs access, correction and deletion requests. Contact{" "}
        <a href="mailto:hello@partnermax.ca">hello@partnermax.ca</a>.
      </p>
    </LegalPage>
  );
}
