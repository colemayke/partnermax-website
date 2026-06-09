/* Static single-logo lockup. PartnerMax is currently the licensed channel
   for Rogers only, so the homepage presents the Rogers mark on its own
   rather than a scrolling strip of placeholders. When more signed-partner
   marks exist, restore the marquee here (tracked in PRE-LAUNCH.md). */
export default function LogoMarquee() {
  return (
    <section className="site-logos">
      <div className="site-logos__inner">
        <p className="site-logos__label">The licensed channel for</p>
        <div className="site-logos__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/rogers-logo.svg" alt="Rogers" />
        </div>
      </div>
    </section>
  );
}
