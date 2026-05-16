import type { ReactNode } from "react";

export type ProcessStepData = {
  num: ReactNode; // e.g. 01<em>.</em>
  eyebrow: string; // "Step 01 · Inquire"
  title: ReactNode;
  desc: ReactNode;
  bullets: ReactNode[];
  side: { label: string; val: ReactNode; desc: ReactNode }[]; // exactly 3
};

/* One detailed step card: sticky huge red number · content (title +
   description + bullet list) · side panel of 3 spec blocks. */
export default function ProcessStep({ step }: { step: ProcessStepData }) {
  return (
    <article className="site-process__step fade-up">
      <div className="site-process__num">{step.num}</div>
      <div className="site-process__content">
        <span className="site-process__eyebrow">{step.eyebrow}</span>
        <h2 className="site-process__title">{step.title}</h2>
        <p className="site-process__desc">{step.desc}</p>
        <ul className="site-process__list">
          {step.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      <aside className="site-process__side">
        {step.side.map((s) => (
          <div className="site-process__side-block" key={s.label}>
            <span className="site-process__side-label">{s.label}</span>
            <span className="site-process__side-val">{s.val}</span>
            <p className="site-process__side-desc">{s.desc}</p>
          </div>
        ))}
      </aside>
    </article>
  );
}
