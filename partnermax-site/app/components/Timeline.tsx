/* The five-step arc on the Process page (.site-timeline). The red dot
   under each step is the CSS ::after on .site-timeline__step. */
const STEPS = [
  { num: "Step 01", title: "Inquire", time: "Same business day" },
  { num: "Step 02", title: "Free consultation", time: "Day 2–3" },
  { num: "Step 03", title: "Quote", time: "Day 4–7" },
  { num: "Step 04", title: "Provision", time: "Day 8–18" },
  { num: "Step 05", title: "Bill", time: "Day 21 onward" },
];

export default function Timeline() {
  return (
    <div className="site-timeline fade-up">
      {STEPS.map((s) => (
        <div className="site-timeline__step" key={s.num}>
          <div className="site-timeline__num">{s.num}</div>
          <h3 className="site-timeline__title">{s.title}</h3>
          <p className="site-timeline__time">{s.time}</p>
        </div>
      ))}
    </div>
  );
}
