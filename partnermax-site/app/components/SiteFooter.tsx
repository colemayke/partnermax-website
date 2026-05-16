import Link from "next/link";

/* Shared footer — identical on every page. Server component (static).
   The prototype's "homepage.html#x" links become Next "/#x" routes;
   the placeholder partner links keep href="#" and are tracked in
   PRE-LAUNCH.md. */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/partnermax-logo-sm.svg" alt="PartnerMax" />
          <p>
            The licensed channel for Rogers business products in Canada.
            Wireless, fibre, plans and bundles &mdash; provisioned and billed
            under one roof.
          </p>
        </div>
        <div className="site-footer__col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/process">Process</Link>
            </li>
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h4>Reach us</h4>
          <ul>
            <li>
              <a href="mailto:hello@partnermax.ca">hello@partnermax.ca</a>
            </li>
            <li>
              <a href="tel:+19999999999">999 999 9999</a>
            </li>
            <li>
              <a href="#">Placeholder St</a>
            </li>
            <li>
              <a href="#">Mon&ndash;Fri · 8a&ndash;6p ET</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__legal">
        <p>
          © 2026 PartnerMax Inc. · Channel partner for Rogers Communications.
          PartnerMax is an independent Canadian company.
        </p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
