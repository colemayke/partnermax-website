/* Full-bleed Toronto skyline break. CSS-background div (parallax factor
   0.18 applied by SiteEffects) so the gradient overlay + caption stay
   exactly as designed. */
export default function ImageBreak() {
  return (
    <section className="site-image-break">
      <div
        className="site-image-break__bg"
        style={{ backgroundImage: "url('/assets/photo-toronto.jpg')" }}
      />
      <div className="site-image-break__inner fade-up">
        <div>
          <div className="site-image-break__eyebrow">
            From Toronto · across Canada
          </div>
          <h2 className="site-image-break__h" data-reveal-text>
            Built in <em>Toronto</em>.
            <br />
            Working coast to coast.
          </h2>
        </div>
        <p className="site-image-break__p">
          Our channel managers and provisioning leads work out of one office on
          Front Street West. The services they activate run in every province
          and territory we&rsquo;re licensed to serve.
        </p>
      </div>
      <span className="site-image-break__caption">Toronto · 43.6°N · HQ</span>
    </section>
  );
}
