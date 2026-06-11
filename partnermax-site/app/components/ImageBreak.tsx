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
            Canadian-built · coast to coast
          </div>
          <h2 className="site-image-break__h" data-reveal-text>
            Built in <em>Canada</em>.
            <br />
            Working coast to coast.
          </h2>
        </div>
        <p className="site-image-break__p">
          Our channel managers and provisioning leads work across Canada. The
          services they activate run in every province and territory
          we&rsquo;re licensed to serve.
        </p>
      </div>
    </section>
  );
}
