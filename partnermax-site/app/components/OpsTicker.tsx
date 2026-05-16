/* Operations status ticker — a continuous marquee. SiteEffects clones
   the track children once at init for a seamless loop (same mechanism
   as the logo marquee). aria-hidden: this is decorative chrome. */
const TICKER_ITEMS = [
  "Network · Operational",
  "Channel desk · Online",
  "Provisioning queue · 14d median",
  "Toronto HQ · 08:42 ET",
  "Wireless SLA · 99.97%",
  "Fibre uptime · Within spec",
  "Response SLA · 1 business day",
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
