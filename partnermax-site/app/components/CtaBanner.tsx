import type { ReactNode } from "react";

/* Dark CTA banner with the pulsing red glow (animation in CSS). Shared
   by all three pages. `children` is the actions column — the embedded
   contact form on the homepage, or buttons on About / Process. */
export default function CtaBanner({
  id,
  eyebrow,
  title,
  text,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="site-cta-banner" {...(id ? { id } : {})}>
      <div className="site-cta-banner__inner">
        <div>
          <div
            style={{
              fontFamily: "var(--pm-font-display)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--pm-red-400)",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
          <h2 className="site-cta-banner__h" data-reveal-text>
            {title}
          </h2>
          <p className="site-cta-banner__p">{text}</p>
        </div>
        <div className="site-cta-banner__actions">{children}</div>
      </div>
    </section>
  );
}
