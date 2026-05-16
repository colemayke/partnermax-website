import type { ReactNode } from "react";

/* Shorter hero for the About / Process / Contact pages
   (.site-page-hero). Same markup for every treatment — the variant
   only swaps a modifier class so the CSS (overrides.css) does the work:

   - default (no `variant`): the original handoff layout, optional
     CSS-background + parallax. Used by /contact (no `bg` → just the
     ink surface + red glow, keeps the transparent fixed nav legible
     at the top of an otherwise light page).
   - `variant="cinematic"` (About): full-bleed darkened image, a
     single centered editorial column, taller band.
   - `variant="minimal"` (Process): full-bleed but airy — a lighter
     scrim so the golden-hour sky reads, compact left-aligned text,
     the red glow dialled right back.

   Parallax applies to every variant that renders a `bg` (SiteEffects
   translates the `.site-page-hero__bg` div). */
export default function PageHero({
  eyebrow,
  title,
  text,
  bg,
  variant,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  bg?: string;
  variant?: "cinematic" | "minimal";
}) {
  const cls =
    "site-page-hero" +
    (variant === "cinematic" ? " site-page-hero--cinematic" : "") +
    (variant === "minimal" ? " site-page-hero--minimal" : "");

  return (
    <header className={cls}>
      {bg ? (
        <div
          className="site-page-hero__bg"
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ) : null}
      <div className="site-page-hero__body">
        <div>
          <div className="site-page-hero__eyebrow">{eyebrow}</div>
          <h1 className="site-page-hero__h" data-reveal-text>
            {title}
          </h1>
        </div>
        <p className="site-page-hero__p">{text}</p>
      </div>
    </header>
  );
}
