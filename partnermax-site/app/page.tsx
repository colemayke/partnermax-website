import Link from "next/link";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import ScrollRule from "./components/ScrollRule";
import SectionHead from "./components/SectionHead";
import Products from "./components/Products";
import DiffGrid from "./components/DiffGrid";
import ImageBreak from "./components/ImageBreak";
import ProcessTeaser from "./components/ProcessTeaser";
import Faq from "./components/Faq";
import CtaBanner from "./components/CtaBanner";
import OpsTicker from "./components/OpsTicker";
import { ArrowRight } from "./components/icons";

const WHY_CELLS = [
  {
    num: "Licensed channel",
    title: (
      <>
        Licensed, not <em>reselling</em>.
      </>
    ),
    desc: (
      <>
        PartnerMax holds the commercial channel license for Rogers business
        products. You work one step from the network, not down a chain of
        resellers.
      </>
    ),
  },
  {
    num: "Single account",
    title: (
      <>
        Provisioned and billed in <em>one place</em>.
      </>
    ),
    desc: (
      <>
        Wireless, fibre and voice are quoted, provisioned and invoiced from one
        PartnerMax account, not split across separate vendor
        relationships.
      </>
    ),
  },
  {
    num: "Canadian operations",
    title: (
      <>
        A named <em>contact</em>, not a queue.
      </>
    ),
    desc: (
      <>
        Toronto-based operations, accounts and provisioning. Every account gets
        a named channel manager with a direct line and a response-time SLA.
      </>
    ),
  },
];

const FAQ_ITEMS = [
  {
    q: "Are you owned by Rogers?",
    defaultOpen: true,
    a: (
      <>
        No. PartnerMax is an independent Canadian company. We hold a commercial
        channel license to provision and sell Rogers business products. We
        are not a Rogers subsidiary, and Rogers does not own equity in
        PartnerMax. We sit between Rogers and the businesses Rogers doesn&rsquo;t
        serve directly.
      </>
    ),
  },
  {
    q: "Who is this for?",
    a: (
      <>
        Two audiences. One: Canadian businesses with 10&ndash;5,000 employees
        that need wireless, fibre or voice but want a single channel partner
        instead of a Rogers enterprise account. Two: technology consultancies
        and MSPs who want to resell Rogers products under their own roof. We
        provide the license, you keep the customer relationship.
      </>
    ),
  },
  {
    q: "Can we keep our existing Rogers account?",
    a: (
      <>
        Yes. We&rsquo;ll port it. Existing Rogers business accounts can
        be transitioned to PartnerMax billing without service interruption. The
        handover is coordinated by our provisioning team and typically completes
        in 30 days.
      </>
    ),
  },
  {
    q: "What does “one bill” really mean?",
    a: (
      <>
        One invoice per month, itemized by location, line and service. Wireless
        lines, fibre circuits, voice services, hardware financing, all
        consolidated. You see every charge; you don&rsquo;t see four separate
        Rogers vendor invoices.
      </>
    ),
  },
  {
    q: "What kind of SLA can you actually back?",
    a: (
      <>
        Dedicated fibre carries a 99.9% uptime SLA with service credits for
        breaches. Wireless and voice carry Rogers&rsquo; commercial SLAs,
        surfaced unmodified in your contract. Channel-manager response time is a
        1-business-day SLA we own ourselves.
      </>
    ),
  },
  {
    q: "How long does becoming a partner take?",
    a: (
      <>
        From first inquiry to a signed partnership and provisioned product:
        14&ndash;21 days for a standard fit. Complex multi-site fibre rollouts
        can extend to 60 days. See the{" "}
        <a
          href="/process"
          style={{ color: "var(--pm-accent)", textDecoration: "underline" }}
        >
          Process
        </a>{" "}
        page for the full breakdown.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <LogoMarquee />

      <ScrollRule />

      <section className="site-section" id="products">
        <div className="site-container">
          <SectionHead
            eyebrow="What we sell"
            title={
              <>
                Four product lines.
                <br />
                <em>One</em> channel.
              </>
            }
            lede={
              <>
                Rogers&rsquo; full business portfolio, delivered through one
                licensed partner: a single contract, a single bill, a
                single renewal cycle.
              </>
            }
          />
          <Products />
        </div>
      </section>

      <ScrollRule dark />

      <section className="site-section site-section--dark" id="why">
        <div className="site-container">
          <SectionHead
            eyebrow="Why PartnerMax"
            title={
              <>
                Not a reseller.
                <br />
                A licensed <em>channel</em>.
              </>
            }
            lede={
              <>
                Most of the Canadian channel market resells someone
                else&rsquo;s contract. We hold the license, run the operations
                and stand behind the bill.
              </>
            }
          />
          <DiffGrid cells={WHY_CELLS} />
        </div>
      </section>

      <ImageBreak />

      <ScrollRule />

      <section className="site-section" id="process">
        <div className="site-container">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Five steps,
                <br />
                start to <em>activation</em>.
              </>
            }
            lede={
              <>
                From first conversation to a provisioned, billed service. A
                standard partnership completes in{" "}
                <strong>14 to 21 days</strong>.
              </>
            }
          />
          <ProcessTeaser />
        </div>
      </section>

      <ScrollRule />

      <section className="site-section site-section--ivory" id="faq">
        <div className="site-container">
          <SectionHead
            eyebrow="FAQ"
            title={
              <>
                Common <em>questions</em>.
              </>
            }
            lede={
              <>
                The questions prospective partners ask most. If yours
                isn&rsquo;t here, get in touch.
              </>
            }
          />
          <Faq items={FAQ_ITEMS} itemReveal />
        </div>
      </section>

      <ScrollRule />

      <CtaBanner
        eyebrow="Become a partner"
        title={
          <>
            Get a quote in
            <br />
            <em>one</em> conversation.
          </>
        }
        text={
          <>
            Tell us about your business or your customers. A channel manager
            replies within one business day with a scoped proposal or a
            straight answer.
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

      <OpsTicker />
    </>
  );
}
