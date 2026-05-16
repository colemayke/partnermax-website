import type { ReactNode } from "react";

export type DiffCell = {
  num: string;
  title: ReactNode;
  desc: ReactNode;
};

/* Three-column differentiator grid (.site-diff). Shared by the homepage
   "Why PartnerMax" section and the About "Mission" section. */
export default function DiffGrid({ cells }: { cells: DiffCell[] }) {
  return (
    <div className="site-diff">
      {cells.map((c, i) => (
        <div
          key={c.num}
          className="site-diff__cell fade-up"
          {...(i > 0 ? { "data-delay": String(i) } : {})}
        >
          <div className="site-diff__num">{c.num}</div>
          <h3 className="site-diff__title">{c.title}</h3>
          <p className="site-diff__desc">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
