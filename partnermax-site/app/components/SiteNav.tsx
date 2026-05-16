"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* Fixed nav. Transparent over the (dark) hero on every page, blurs to
   opaque once scrolled past 24px. Active link is derived from the route
   instead of being hard-coded per page like the prototype. */
export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    "site-nav__link" + (pathname === href ? " is-active" : "");

  return (
    <nav
      className={"site-nav" + (scrolled ? " is-scrolled" : "")}
      data-theme="dark"
    >
      <div className="site-nav__left">
        <Link href="/" className="site-nav__logo" aria-label="PartnerMax home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/partnermax-logo-sm.svg" alt="PartnerMax" />
        </Link>
        <div className="site-nav__links">
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
          <Link href="/process" className={linkClass("/process")}>
            Process
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </div>
      </div>
      <div className="site-nav__right">
        <a href="#" className="site-nav__signin">
          Sign in
        </a>
        <Link href="/contact" className="site-nav__cta">
          Become a partner
        </Link>
      </div>
    </nav>
  );
}
