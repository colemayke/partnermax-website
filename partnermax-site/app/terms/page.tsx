import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "PartnerMax terms of use (draft placeholder).",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of use">
      <p>
        These terms govern use of the PartnerMax website. They are distinct from
        the commercial agreement that governs a signed partnership, which is
        contracted separately.
      </p>

      <h2>Use of this site</h2>
      <p>
        The content here is provided for general information about PartnerMax
        and the Rogers business products we are licensed to sell. Pricing,
        timelines and SLAs shown are illustrative until confirmed in a written
        quote.
      </p>

      <h2>Channel relationship</h2>
      <p>
        PartnerMax is an independent Canadian company and a licensed channel
        partner for Rogers Communications. It is not a Rogers subsidiary.
        Rogers&rsquo; own product terms and SLAs apply to the underlying
        services and are surfaced unmodified in your contract.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Trademarks, including Rogers&rsquo;, are the property of their
        respective owners and used here pending confirmation of Rogers&rsquo;
        co-brand guidelines.
      </p>

      <h2>Liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties. Final
        liability terms are set in the partnership agreement.
      </p>
    </LegalPage>
  );
}
