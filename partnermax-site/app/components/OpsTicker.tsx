/* Operations status ticker, a continuous marquee. SiteEffects clones
   the track children once at init for a seamless loop (same mechanism
   as the logo marquee). aria-hidden: this is decorative chrome. */
const TICKER_ITEMS = [
  "Rogers Licensed",
  "25+ years of experience",
  "Independent Canadian company",
  "Coast-to-coast coverage",
  "Wireless · Fibre · Voice",
  "One partner · one bill",
];

export default function OpsTicker() {
  return (
    <section className="site-ticker" aria-hidden="true">
      <div className="site-ticker__track">
        {TICKER_ITEMS.map((item) => (
          <div className="site-ticker__item" key={item}>
            <span className="site-ticker__dot" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
