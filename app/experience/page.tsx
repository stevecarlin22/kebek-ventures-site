import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";

const workstreams = [
  {
    title: "Revenue + go-to-market system design",
    desc: "Diagnose why growth isn’t scaling cleanly, then design a repeatable revenue engine: ICP, segmentation, offers, sales motion, pipeline discipline, and operating cadence.",
  },
  {
    title: "Market focus + strategic alternatives",
    desc: "Tighten focus, clarify where to play, and pressure-test strategic options with clear risks, mitigations, and board-ready decision framing.",
  },
  {
    title: "Partner and channel strategy",
    desc: "Direct vs partner tradeoffs, partner program design, co-selling motion, and accountability so partners create scale instead of noise.",
  },
  {
    title: "Operating model + execution discipline",
    desc: "Translate strategy into execution: roles, operating cadence, decision rights, handoffs, KPIs, and a system that doesn’t break as the org grows.",
  },
  {
    title: "Commercial narrative + messaging",
    desc: "Positioning, value proposition, and a cohesive story across sales, marketing, and leadership so customers understand why you win.",
  },
  {
    title: "Forecasting, finance, and business model rigor",
    desc: "Build an audit-proof forecasting and KPI discipline, align Sales and Finance, clarify cost-to-serve, and rationalize pricing and packaging.",
  },
];

const artifacts = [
  {
    title: "Board-ready diagnostic",
    desc: "A clear, candid readout of what’s working, what’s breaking, and where execution is leaking—built from interviews, data, and field reality.",
  },
  {
    title: "Strategic alternatives memo",
    desc: "A small set of real options with tradeoffs, risks, mitigations, and a recommendation you can align the leadership team and board around.",
  },
  {
    title: "Operating cadence + KPI system",
    desc: "Weekly and monthly rhythms, dashboards, and accountability loops so the org runs predictably and decisions happen faster.",
  },
  {
    title: "Implementation roadmap",
    desc: "A sequenced plan with owners, milestones, and measurable outcomes so the work actually lands inside the company—not just in slides.",
  },
];

const howWeWork = [
  {
    title: "Phase 1: Diagnose and focus",
    bullets: [
      "Structured interviews across leadership, board, and key external stakeholders",
      "Market and competitive analysis grounded in your actual selling reality",
      "Strategic alternatives and recommendations with risks and mitigations",
    ],
  },
  {
    title: "Phase 2: Implement and institutionalize",
    bullets: [
      "Translate recommendations into an implementation plan with clear owners and cadence",
      "Establish measurement, reporting, and KPI discipline",
      "Monthly leadership readouts to track progress and course-correct fast",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <main>
      {/* Hero */}
      <section className="container-pad mx-auto max-w-6xl pt-20 sm:pt-24 pb-10 sm:pb-12">
        <div className="max-w-3xl">
          <p className="kicker">Experience</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
            Advisory work that produces clarity and execution—not theater.
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-black/70">
            Kebek Ventures supports leadership teams at moments of inflection: growth is real,
            complexity is rising, and the system is not yet durable. The work is designed to be
            board-usable, operator-grade, and implementable inside the organization.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/contact">
              Start a conversation
            </Link>
            <Link className="btn-ghost" href="/where-we-help">
              Where we help
            </Link>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <Section
        title="What KV delivers in an engagement"
        kicker="Example Deliverables"
        subtitle="Practical artifacts and systems that leadership teams use to make decisions, align execution, and build repeatability."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {artifacts.map((a) => (
            <Card key={a.title} title={a.title} desc={a.desc} />
          ))}
        </div>
      </Section>

      {/* Workstreams */}
      <Section
        title="Common workstreams"
        kicker="Work"
        subtitle="Examples of the work inside advisory and consulting projects. Specific client details are often anonymized."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {workstreams.map((w) => (
            <Card key={w.title} title={w.title} desc={w.desc} />
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section
        title="A simple engagement structure that scales"
        kicker="Method"
        subtitle="Two phases: get to the truth fast, then build the systems to make it stick."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {howWeWork.map((p) => (
            <div key={p.title} className="card p-6 sm:p-7">
              <h3 className="h3">{p.title}</h3>
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-black/70 leading-relaxed list-disc pl-5">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 card p-6 sm:p-7">
          <p className="p-sm text-black/70">
            Note: Many engagements include sensitive commercial details. Where examples are shared, they are
            presented in a way that protects confidentiality while still showing the nature of the work.
          </p>
        </div>
      </Section>

      {/* Example scope (anonymized) */}
      <Section
        title="Representative project scope (anonymized)"
        kicker="Example"
        subtitle="A typical advisory project for a growth-stage platform navigating complexity."
      >
        <div className="card p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="h3">Inputs</h3>
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-black/70 leading-relaxed list-disc pl-5">
                <li>Leadership and stakeholder interviews</li>
                <li>Pipeline, forecast, and sales process review</li>
                <li>Customer and partner feedback</li>
                <li>Market sizing and competitive scan</li>
                <li>Product and services roadmap review</li>
              </ul>
            </div>

            <div>
              <h3 className="h3">Outputs</h3>
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-black/70 leading-relaxed list-disc pl-5">
                <li>Strategic focus and “where to play” recommendation</li>
                <li>GTM system design: ICP, motion, proposals, stage gates</li>
                <li>Messaging and narrative used across sales and marketing</li>
                <li>Operating cadence, KPIs, and forecasting discipline</li>
                <li>Implementation roadmap with owners and milestones</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="container-pad mx-auto max-w-6xl pb-16 sm:pb-24">
        <div className="rounded-3xl bg-ink text-white shadow-lift overflow-hidden">
          <div className="p-8 sm:p-10 md:p-12 grid gap-8 md:grid-cols-2 items-center">
            <div>
              <p className="kicker text-white/70">Engage</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                Want a durable system behind your growth?
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                If growth is real but execution is breaking down, Kebek Ventures can help you
                move from momentum to repeatability.
              </p>
            </div>
            <div className="flex md:justify-end gap-3 flex-wrap">
              <Link className="btn-primary" href="/contact">
                Contact
              </Link>
              <Link className="btn-ghost" href="/where-we-help">
                Explore focus areas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
