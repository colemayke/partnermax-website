import Link from "next/link";
import { ArrowRight } from "./icons";

const STEPS = [
  {
    num: "Step 01",
    title: "Inquire",
    desc: "Reach out with what you need: service type, fleet size, geography.",
  },
  {
    num: "Step 02",
    title: "Free consultation",
    desc: "A 30-minute session with a channel manager to size and scope.",
  },
  {
    num: "Step 03",
    title: "Quote",
    desc: "Itemized written quote, valid for 30 days.",
  },
  {
    num: "Step 04",
    title: "Provision",
    desc: "We coordinate Rogers, deliver hardware, activate lines and circuits.",
  },
  {
    num: "Step 05",
    title: "Bill",
    desc: "One monthly invoice and one account manager. Changes within a business day.",
  },
];

export default function ProcessTeaser() {
  return (
    <>
      <div className="site-process-teaser">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className="site-process-teaser__step fade-up"
            {...(i > 0 ? { "data-delay": String(i) } : {})}
          >
            <span className="site-process-teaser__num">{s.num}</span>
            <h3 className="site-process-teaser__title">{s.title}</h3>
            <p className="site-process-teaser__desc">{s.desc}</p>
          </div>
        ))}
      </div>

      <div
        className="fade-up"
        style={{
          marginTop: 48,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link href="/process" className="pm-btn pm-btn--outline pm-btn--lg">
          <span>Read the full process</span>
          <ArrowRight />
        </Link>
      </div>
    </>
  );
}
