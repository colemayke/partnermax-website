import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell PartnerMax about your business or your customers. A named channel manager replies within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s scope it <em>together</em>.
          </>
        }
        text={
          <>
            Tell us about your business or your customers. A named channel
            manager replies within one business day &mdash; a scoped proposal,
            or just a straight answer.
          </>
        }
      />

      <section className="site-section">
        <div className="site-container site-container--narrow">
          <div className="fade-up" style={{ maxWidth: 720, margin: "0 auto" }}>
            <ContactForm tone="light" />
            <p
              style={{
                fontFamily: "var(--pm-font-body)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--pm-text-muted)",
                margin: "24px 0 0",
                textAlign: "center",
              }}
            >
              Prefer to skip the form?{" "}
              <a
                href="mailto:hello@partnermax.ca"
                style={{ color: "var(--pm-accent)" }}
              >
                hello@partnermax.ca
              </a>{" "}
              ·{" "}
              <a
                href="tel:+19999999999"
                style={{ color: "var(--pm-accent)" }}
              >
                999 999 9999
              </a>
              <br />
              Mon&ndash;Fri · 8a&ndash;6p ET · Placeholder St
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
