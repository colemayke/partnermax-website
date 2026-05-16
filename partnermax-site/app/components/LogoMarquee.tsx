/* Auto-scrolling customer strip. Real Rogers mark
   (/assets/rogers-logo.svg) + 7 dashed placeholders that still need real
   signed-partner marks before launch (tracked in PRE-LAUNCH.md).
   SiteEffects clones the track once for a seamless loop; hover pauses
   via CSS. */
export default function LogoMarquee() {
  return (
    <section className="site-logos">
      <div className="site-logos__inner">
        <p className="site-logos__label">Networks and partners we work with</p>
        <div className="site-marquee">
          <div className="site-marquee__track">
            <div className="site-marquee__item site-marquee__item--brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/rogers-logo.svg"
                alt="Rogers"
                style={{ height: 24, width: "auto", display: "block" }}
              />
            </div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="site-marquee__item site-marquee__item--placeholder"
              >
                Partner logo
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
