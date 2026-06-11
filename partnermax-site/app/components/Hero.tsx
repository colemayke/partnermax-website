import Link from "next/link";
import { ArrowRight } from "./icons";

/* Homepage hero, full viewport. The background is an animated CSS mesh
   gradient: four blurred, slowly-drifting colour blobs over a dark base.
   It stays a .site-hero__bg div (not next/image) so the documented
   parallax (SiteEffects translates .site-hero__bg) and the ::before /
   ::after overlay gradients keep working exactly as designed. The blobs
   animate their own transform, independent of the parallax on the
   parent, and pause under prefers-reduced-motion. */
export default function Hero() {
  return (
    <header className="site-hero">
      <div className="site-hero__bg site-hero__bg--gradient" aria-hidden="true">
        <span className="site-hero__blob site-hero__blob--1" />
        <span className="site-hero__blob site-hero__blob--2" />
        <span className="site-hero__blob site-hero__blob--3" />
        <span className="site-hero__blob site-hero__blob--4" />
      </div>
      <div className="site-hero__body">
        <div>
          <div className="site-hero__eyebrow">
            25+ years of channel partnerships in Canada
          </div>
          <h1 className="site-hero__h" data-reveal-text>
            Redefining the channel for
            <br />
            <em>Canadian</em> business.
          </h1>
          <p className="site-hero__p" data-reveal-text>
            PartnerMax is the licensed channel for Rogers business products in
            Canada. We hold the licensing, run the provisioning and own the
            billing, so you buy wireless, fibre, plans and bundles
            through one partner.
          </p>
          <div className="site-hero__cta">
            <Link
              href="/contact"
              className="pm-btn pm-btn--primary pm-btn--lg"
              data-magnetic="0.3"
            >
              <span>Become a partner</span>
              <ArrowRight />
            </Link>
            <Link
              href="/contact"
              className="pm-btn pm-btn--lg"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,.2)",
              }}
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
