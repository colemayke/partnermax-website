import type { ReactNode } from "react";

/* The two-column section header used across every page (.site-block-head).
   The title carries data-reveal-text so SiteEffects runs the word-by-word
   reveal; the wrapper carries fade-up so the red number underline draws
   on entry. Pass <em> inside `title` for the signature italic accent. */
export default function SectionHead({
  num,
  eyebrow,
  title,
  lede,
}: {
  num: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <header className="site-block-head fade-up">
      <div className="site-block-head__eyebrow">
        <span className="site-block-head__num">{num}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="site-block-head__title" data-reveal-text>
          {title}
        </h2>
        {lede ? <p className="site-block-head__lede">{lede}</p> : null}
      </div>
    </header>
  );
}
