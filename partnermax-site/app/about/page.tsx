import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import ScrollRule from "../components/ScrollRule";
import SectionHead from "../components/SectionHead";
import DiffGrid from "../components/DiffGrid";
import TeamCard, { type TeamMember } from "../components/TeamCard";
import CtaBanner from "../components/CtaBanner";
import { ArrowRight } from "../components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who PartnerMax is, how we work, and the people running it.",
};

const MISSION_CELLS = [
  {
    num: "01 / The carrier’s job",
    title: (
      <>
        Build the <em>network</em>.
      </>
    ),
    desc: (
      <>
        The carrier owns the spectrum, the fibre and the regulatory load. That
        work is theirs, and it isn&rsquo;t where we add anything.
      </>
    ),
  },
  {
    num: "02 / The channel’s job",
    title: (
      <>
        Translate it into a <em>relationship</em>.
      </>
    ),
    desc: (
      <>
        A national carrier can&rsquo;t know every business by name. We can. We
        scope the deal, size the rollout, and stay reachable when something
        needs sorting.
      </>
    ),
  },
  {
    num: "03 / The customer’s job",
    title: (
      <>
        Run the <em>business</em>.
      </>
    ),
    desc: (
      <>
        You shouldn&rsquo;t need to tell a hosted PBX from a SIP trunk to get
        one quoted. We hold the complexity so your attention stays on your own
        customers.
      </>
    ),
  },
];

const TEAM: TeamMember[] = [
  {
    role: "Managing Partner · Channel & Operations",
    name: "Dean Mayke",
    initials: "DM",
    bio: "Dean leads the channel relationships and day-to-day operations. He spent close to a decade running mid-market business accounts in commercial wireless, and now spends most of his week with the partners he has signed since.",
    meta: [
      { label: "Based", value: "Toronto, ON" },
      { label: "Direct", value: "dean@partnermax.ca", href: "mailto:dean@partnermax.ca" },
      { label: "LinkedIn", value: "/in/deanmayke" },
    ],
  },
  {
    role: "Managing Partner · Network & Provisioning",
    name: "Brian Ochab",
    initials: "BO",
    bio: "Brian runs operations — the side of PartnerMax that turns a signed quote into working service. His background is in carrier network design and managed services, and he has overseen a long list of Canadian fibre builds.",
    meta: [
      { label: "Based", value: "Toronto, ON" },
      { label: "Direct", value: "brian@partnermax.ca", href: "mailto:brian@partnermax.ca" },
      { label: "LinkedIn", value: "/in/brianochab" },
    ],
  },
];

/* Real team names (user-provided). Roles are intentionally shown as
   "Placeholder" until the real titles are confirmed (tracked in
   PRE-LAUNCH.md). */
const STAFF: { name: string; role: string; initials: string }[] = [
  { name: "Melanie Tessier", role: "Placeholder", initials: "MT" },
  { name: "Dan Charbonneau", role: "Placeholder", initials: "DC" },
  { name: "Ryan Jemielity", role: "Placeholder", initials: "RJ" },
  { name: "Cole Mayke", role: "Placeholder", initials: "CM" },
  { name: "Cristian Vegara", role: "Placeholder", initials: "CV" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="01 / About"
        variant="cinematic"
        bg="/assets/skyline-toronto-dusk.jpg"
        title={
          <>
            An independent <em>Canadian</em> channel for business
            connectivity.
          </>
        }
        text={
          <>
            We handle licensing, provisioning and billing so mid-sized
            companies get enterprise-grade service without the enterprise
            runaround.
          </>
        }
      />

      <ScrollRule label="01 / The founding" />

      <section className="site-section" id="story">
        <div className="site-container">
          <SectionHead
            num="01"
            eyebrow="The founding story"
            title={
              <>
                Why PartnerMax
                <br />
                <em>exists</em>.
              </>
            }
            lede={
              <>
                Canada&rsquo;s networks are run by a handful of national
                carriers. Plenty of capable businesses are too small for an
                enterprise sales team and too serious for a retail plan.
                We&rsquo;re the layer in between.
              </>
            }
          />

          <div className="site-story fade-up">
            <div className="site-story__main">
              <p>
                The national carriers build excellent commercial networks. What
                they can&rsquo;t do is give every mid-sized business in the
                country a direct line to someone who actually knows the
                account.
              </p>
              <p className="site-story__pull">
                Most of our customers came to us after months of unanswered
                enterprise sales emails.
              </p>
              <p>
                PartnerMax holds a commercial channel license with Rogers, runs
                the operations that turn a quote into working service, and
                stands behind a single monthly invoice. Our customers are
                regional logistics firms, multi-site manufacturers, healthcare
                networks and Crown corporations &mdash; organizations that run
                on real connectivity but don&rsquo;t have a procurement
                department to wrangle it.
              </p>
              <p>
                We don&rsquo;t resell from a distance. We license the products,
                provision them, and own the bill. The relationship stays direct
                &mdash; just sized for the businesses a national carrier
                can&rsquo;t cover one at a time.
              </p>
            </div>

            <aside className="site-story__aside">
              <div
                className="site-image-inset"
                style={{ aspectRatio: "4 / 5" }}
              >
                <div
                  className="site-image-inset__bg"
                  style={{
                    backgroundImage: "url('/assets/photo-toronto.jpg')",
                  }}
                />
                <div className="site-image-inset__caption">
                  <span>Across Canada</span>
                  <span>Channel</span>
                </div>
              </div>
              <div className="site-story__aside-block">
                <span className="site-story__aside-label">Licensed</span>
                <span
                  className="site-story__aside-val"
                  style={{ fontSize: 24 }}
                >
                  Rogers
                </span>
                <p className="site-story__aside-desc">
                  Commercial channel license for Rogers business products.
                </p>
              </div>
              <div className="site-story__aside-block">
                <span className="site-story__aside-label">Coverage</span>
                <span
                  className="site-story__aside-val"
                  style={{ fontSize: 24 }}
                >
                  Coast to <em>coast</em>
                </span>
                <p className="site-story__aside-desc">
                  Every province and territory we&rsquo;re licensed to serve.
                </p>
              </div>
              <div className="site-story__aside-block">
                <span className="site-story__aside-label">Specialization</span>
                <span
                  className="site-story__aside-val"
                  style={{ fontSize: 24 }}
                >
                  Business telecom
                </span>
                <p className="site-story__aside-desc">
                  Wireless, dedicated fibre, voice and bundled commercial
                  service.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ScrollRule label="02 / Mission" dark />

      <section className="site-section site-section--dark" id="mission">
        <div className="site-container">
          <SectionHead
            num="02"
            eyebrow="The mission"
            title={
              <>
                The role of <em>channel</em>
                <br />
                in Canadian telecom.
              </>
            }
            lede={
              <>
                What a channel partner actually does: carry the operational
                weight so the carrier can run the network and the customer can
                run the business. Three principles guide how we do it.
              </>
            }
          />

          <DiffGrid cells={MISSION_CELLS} />

          <div
            className="fade-up"
            style={{
              marginTop: 64,
              paddingTop: 48,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontFamily: "var(--pm-font-display)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              In our words
            </span>
            <p
              style={{
                fontFamily: "var(--pm-font-body)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 24,
                lineHeight: 1.5,
                color: "var(--pm-ink-0)",
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              &ldquo;We measure ourselves on one thing: how quickly a customer
              gets a straight answer from a real person. The rest follows from
              that.&rdquo;
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--pm-font-display)",
                  fontStyle: "normal",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 24,
                }}
              >
                Dean Mayke · Managing Partner
              </span>
            </p>
          </div>
        </div>
      </section>

      <ScrollRule label="03 / Leadership" />

      <section className="site-section" id="team">
        <div className="site-container">
          <SectionHead
            num="03"
            eyebrow="Leadership"
            title={
              <>
                The managing
                <br />
                <em>partners</em>.
              </>
            }
            lede={
              <>
                PartnerMax is run by two managing partners with long careers in
                Canadian commercial wireless, fibre operations and B2B telecom.
                They stay close to the accounts.
              </>
            }
          />

          <div className="site-team">
            {TEAM.map((m, i) => (
              <TeamCard key={m.name} member={m} delay={i} />
            ))}
          </div>

          <div className="site-team-more fade-up">
            <div className="site-team-more__head">
              <span className="site-team-more__label">The team</span>
              <p className="site-team-more__note">
                Channel managers, provisioning leads and operations. Every
                customer is assigned named contacts from this group.
              </p>
            </div>
            <div className="site-team-more__grid">
              {STAFF.map((p) => (
                <div className="site-team-mini" key={p.name}>
                  <div className="site-team-mini__avatar" aria-hidden="true">
                    {p.initials[0]}
                    <em>{p.initials.slice(1)}</em>
                  </div>
                  <div>
                    <h4 className="site-team-mini__name">{p.name}</h4>
                    <span className="site-team-mini__role">{p.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="fade-up"
            style={{
              marginTop: 64,
              paddingTop: 48,
              borderTop: "1px solid var(--pm-border)",
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 64,
            }}
          >
            <span
              style={{
                fontFamily: "var(--pm-font-display)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--pm-text-subtle)",
              }}
            >
              Behind the partners
            </span>
            <p
              style={{
                fontFamily: "var(--pm-font-editorial)",
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--pm-text-muted)",
                margin: 0,
                maxWidth: "64ch",
              }}
            >
              One Canadian team across channel management, provisioning,
              network operations, accounts and finance. Every customer gets a
              named channel manager and a named provisioning lead from day one.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Talk to the partners"
        title={
          <>
            Start with a
            <br />
            <em>conversation</em>.
          </>
        }
        text={
          <>
            Dean or Brian takes the first call themselves &mdash; whoever&rsquo;s
            closer to your industry. You&rsquo;ll be talking to someone who can
            actually scope the work.
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
          Contact Sales
        </Link>
      </CtaBanner>
    </>
  );
}
