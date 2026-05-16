import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import ScrollRule from "../components/ScrollRule";
import SectionHead from "../components/SectionHead";
import Timeline from "../components/Timeline";
import ProcessStep, { type ProcessStepData } from "../components/ProcessStep";
import Faq, { type FaqItem } from "../components/Faq";
import CtaBanner from "../components/CtaBanner";
import { ArrowRight } from "../components/icons";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five steps, start to activation. From first inquiry to a billed, provisioned Rogers business product.",
};

const linkStyle = {
  color: "var(--pm-accent)",
  textDecoration: "underline",
} as const;

const STEPS: ProcessStepData[] = [
  {
    num: (
      <>
        01<em>.</em>
      </>
    ),
    eyebrow: "Step 01 · Inquire",
    title: (
      <>
        Tell us what you <em>need</em>.
      </>
    ),
    desc: (
      <>
        One form, an email, or a phone call. We just need to know the service
        shape &mdash; wireless lines, fibre circuits, voice services, or all of
        it &mdash; and the rough scale.
      </>
    ),
    bullets: [
      <>
        Submit the form on the homepage, or email{" "}
        <a href="mailto:hello@partnermax.ca" style={linkStyle}>
          hello@partnermax.ca
        </a>
        .
      </>,
      "Tell us service type, fleet or site size, and provinces of operation.",
      "If you have existing Rogers accounts, send the account numbers.",
      "Reseller? Tell us — that path has a separate qualification.",
    ],
    side: [
      {
        label: "Timing",
        val: (
          <>
            <em>Same</em> business day
          </>
        ),
        desc: "A named channel manager replies before close of business with next steps.",
      },
      {
        label: "What you receive",
        val: "A direct reply",
        desc: "Not a ticket number. The person who replies is the person you’ll work with end-to-end.",
      },
      {
        label: "What we need from you",
        val: "Five minutes",
        desc: "A short form is enough. We’ll fill the gaps on the call.",
      },
    ],
  },
  {
    num: (
      <>
        02<em>.</em>
      </>
    ),
    eyebrow: "Step 02 · Free consultation",
    title: (
      <>
        Thirty minutes to <em>size</em> the deal.
      </>
    ),
    desc: (
      <>
        A working session, not a pitch. Your channel manager walks through the
        scope, the geography, the existing contracts you&rsquo;re replacing, and
        the constraints we should know about.
      </>
    ),
    bullets: [
      "Video or in-person at our Front Street office — your call.",
      "We map your service needs onto the Rogers product set.",
      "We flag anything Rogers can’t cover (so you can plan around it).",
      "We agree on the shape of the quote before we go build it.",
    ],
    side: [
      {
        label: "Timing",
        val: (
          <>
            Day 2<em>–</em>3
          </>
        ),
        desc: "Booked the same day as your inquiry. 30 minutes is the standard slot.",
      },
      {
        label: "Cost",
        val: "$0",
        desc: "No engagement fee. No commitment. You walk away with a clearer plan either way.",
      },
      {
        label: "Who attends",
        val: (
          <>
            Your <em>two</em> leads
          </>
        ),
        desc: "Your channel manager and (if relevant) the provisioning lead who’ll handle activation.",
      },
    ],
  },
  {
    num: (
      <>
        03<em>.</em>
      </>
    ),
    eyebrow: "Step 03 · Quote",
    title: (
      <>
        A written, <em>itemized</em>
        <br />
        proposal.
      </>
    ),
    desc: (
      <>
        One PDF. Every line item visible. The price you sign at is the price on
        the first invoice &mdash; we don&rsquo;t add provisioning fees, channel
        surcharges, or activation costs after the fact.
      </>
    ),
    bullets: [
      "Itemized by service, line, site and term length.",
      "Includes Rogers-side SLAs and the PartnerMax operations SLA.",
      "Includes the cancellation terms and the renewal terms.",
      "Valid for 30 days; locks the pricing for the contract term.",
    ],
    side: [
      {
        label: "Timing",
        val: (
          <>
            Day 4<em>–</em>7
          </>
        ),
        desc: "Three to four business days after consultation for a standard quote.",
      },
      {
        label: "Validity",
        val: (
          <>
            <em>30</em> days
          </>
        ),
        desc: "The quote holds for a calendar month. Hardware availability can shift it earlier — we’ll flag if it does.",
      },
      {
        label: "Revisions",
        val: "Unlimited",
        desc: "Adjust the scope as many times as you need before signing. No charge for revisions.",
      },
    ],
  },
  {
    num: (
      <>
        04<em>.</em>
      </>
    ),
    eyebrow: "Step 04 · Provision",
    title: (
      <>
        We turn it <em>on</em>.
      </>
    ),
    desc: (
      <>
        The operational heart of PartnerMax. Your named provisioning lead
        coordinates Rogers, sequences hardware delivery, and activates every
        line and circuit on the agreed cutover date.
      </>
    ),
    bullets: [
      "SIMs, devices and routers shipped direct to each site.",
      "Number porting handled inside Rogers, no downtime windows.",
      "Fibre installs scheduled with the carrier’s field team.",
      "Acceptance testing on every line before we mark complete.",
    ],
    side: [
      {
        label: "Timing",
        val: (
          <>
            Day 8<em>–</em>18
          </>
        ),
        desc: "Wireless: 3–5 days. Fibre: 10–14 days. Voice porting: 7–10 days. Run in parallel.",
      },
      {
        label: "Hand-off",
        val: (
          <>
            A single
            <br />
            <em>cutover</em> date
          </>
        ),
        desc: "You pick the calendar day. Everything lights up on that day, not in pieces.",
      },
      {
        label: "Support coverage",
        val: (
          <>
            24<em>/</em>7
          </>
        ),
        desc: "From cutover onward. Provisioning lead stays on the account through the first invoice cycle.",
      },
    ],
  },
  {
    num: (
      <>
        05<em>.</em>
      </>
    ),
    eyebrow: "Step 05 · Bill",
    title: (
      <>
        One invoice, <em>monthly</em>.
      </>
    ),
    desc: (
      <>
        Wireless, fibre, voice, hardware financing &mdash; consolidated.
        Itemized by line and site. Net-30 terms. Edit anytime through your
        channel manager or your partner console.
      </>
    ),
    bullets: [
      "One PDF invoice per month, plus machine-readable CSV.",
      "Line-level detail, with monthly cost and usage variance.",
      "Renewal notices 90 days out — no surprise rollovers.",
      "Account changes processed inside one business day.",
    ],
    side: [
      {
        label: "First invoice",
        val: "Day 21+",
        desc: "Issued the calendar month after cutover. Pro-rated for partial months.",
      },
      {
        label: "Terms",
        val: (
          <>
            Net-<em>30</em>
          </>
        ),
        desc: "Wire, EFT or pre-authorized debit. We’ll accommodate your AP workflow.",
      },
      {
        label: "Renewal",
        val: "90 day notice",
        desc: "Always. Every contract. You choose every cycle whether to keep the relationship.",
      },
    ],
  },
];

const PROCESS_FAQ: FaqItem[] = [
  {
    q: "Can we accelerate it?",
    defaultOpen: true,
    a: (
      <>
        Yes &mdash; wireless-only deals can compress to 7&ndash;10 days end to
        end if you can sign the quote within 48 hours. Fibre installations are
        gated by Rogers&rsquo; field scheduling; we&rsquo;ll move it as fast as
        the carrier allows but can&rsquo;t go below 10 days.
      </>
    ),
  },
  {
    q: "What if we’re mid-contract with another vendor?",
    a: (
      <>
        We&rsquo;ll quote you for the date your existing contract ends and hold
        the price until then. Most partnerships start as a future-dated quote
        signed now, with the cutover scheduled for the month after expiry
        &mdash; so your transition is sequenced, not stacked.
      </>
    ),
  },
  {
    q: "Do you handle multi-province rollouts?",
    a: (
      <>
        Yes &mdash; we cover every province where Rogers operates commercially.
        Multi-province rollouts add 1&ndash;2 weeks for sequenced provisioning,
        but the SLAs and the invoice stay unified. You don&rsquo;t talk to a
        different team for the BC sites versus the Ontario sites.
      </>
    ),
  },
  {
    q: "What happens if Rogers misses an install date?",
    a: (
      <>
        Your provisioning lead owns the rescheduling and any service credits
        flowing from the Rogers SLA. You&rsquo;ll get a written status the day
        of, not a week later. We&rsquo;ve found that having one point of
        accountability for the carrier relationship makes these the calmest
        moments of the process.
      </>
    ),
  },
  {
    q: "Can we change scope after activation?",
    a: (
      <>
        Add lines anytime &mdash; processed inside one business day. Remove
        lines on the next billing cycle. Add new services (e.g. fibre after
        wireless) at any point during the term; we&rsquo;ll re-quote the
        addition without re-papering the original contract.
      </>
    ),
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="02 / Process"
        bg="/assets/photo-rail.jpg"
        title={
          <>
            Five steps,
            <br />
            start to <em>activation</em>.
          </>
        }
        text={
          <>
            From the first inquiry to a billed, provisioned Rogers business
            product. A standard partnership clears in 14&ndash;21 days &mdash;
            the same shape, every time. No surprises.
          </>
        }
      />

      <ScrollRule label="01 / Timeline" />

      <section className="site-section site-section--subtle">
        <div className="site-container">
          <SectionHead
            num="00"
            eyebrow="The arc"
            title={
              <>
                Two to three
                <br />
                <em>weeks</em>, end to end.
              </>
            }
            lede={
              <>
                The full path, with realistic timing on each stage. Complex
                multi-site fibre rollouts can extend to 60 days &mdash;
                we&rsquo;ll tell you up front if your scope is one of them.
              </>
            }
          />
          <Timeline />
        </div>
      </section>

      <ScrollRule label="02 / Five steps" />

      <section className="site-section">
        <div className="site-container">
          <div className="site-process">
            {STEPS.map((s) => (
              <ProcessStep key={s.eyebrow} step={s} />
            ))}
          </div>
        </div>
      </section>

      <ScrollRule label="03 / Process FAQ" />

      <section className="site-section site-section--ivory">
        <div className="site-container">
          <SectionHead
            num="06"
            eyebrow="Process FAQ"
            title={
              <>
                Common <em>questions</em>
                <br />
                about the path.
              </>
            }
            lede={
              <>
                Questions specifically about how PartnerMax operates &mdash; not
                what we sell.
              </>
            }
          />
          <Faq items={PROCESS_FAQ} />
        </div>
      </section>

      <CtaBanner
        eyebrow="Step zero"
        title={
          <>
            The process starts
            <br />
            with a <em>conversation</em>.
          </>
        }
        text={
          <>
            Submit the form, send us an email, or pick up the phone. A named
            channel manager replies before close of business &mdash; same day,
            every day.
          </>
        }
      >
        <Link
          href="/contact"
          className="pm-btn pm-btn--primary pm-btn--lg"
          data-magnetic="0.3"
        >
          <span>Become a partner</span>
          <ArrowRight />
        </Link>
        <Link
          href="/contact"
          className="pm-btn pm-btn--lg"
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid rgba(255,255,255,.2)",
          }}
        >
          Talk to sales
        </Link>
      </CtaBanner>
    </>
  );
}
