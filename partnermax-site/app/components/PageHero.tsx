import type { ReactNode } from "react";

/* Shorter hero for the About / Process / Contact pages
   (.site-page-hero). Same CSS-background + parallax treatment as the
   homepage hero. `bg` is optional — without it the band is just the
   dark ink surface + red glow (used by the simple /contact page), which
   also keeps the transparent fixed nav legible at the top of an
   otherwise light page. */
export default function PageHero({
  eyebrow,
  title,
  text,
  bg,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  bg?: string;
}) {
  return (
    <header className="site-page-hero">
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
