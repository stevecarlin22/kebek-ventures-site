import Section from "@/components/Section";
import Card from "@/components/Card";
import { blocks } from "@/content/site";

export default function WhereWeHelpPage() {
  return (
    <main className="container-pad mx-auto max-w-6xl py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="kicker">Where we help</p>
        <h1 className="h1 mt-4">The moments that matter most.</h1>
        <p className="p mt-5">
          Kebek Ventures is typically engaged when growth is real, but the system is not yet durable.
          We help leadership teams bring structure, clarity, and execution discipline to consequential decisions,
          from early revenue through global scale.
        </p>
      </div>

      <Section
        title="Common inflection points"
        subtitle="Situations where our diagnostic and operating work creates immediate leverage."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {blocks.whereWeHelp.map((b) => (
            <Card key={b.title} title={b.title} desc={b.desc} />
          ))}
        </div>
      </Section>

      <Section
        title="How we work"
        subtitle="A practical, operator-led approach built for speed and clarity."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.approach.map((b) => (
            <Card key={b.title} title={b.title} desc={b.desc} />
          ))}
        </div>
      </Section>

      <Section
        title="Engagement formats"
        subtitle="Flexible structures that match the problem and the moment."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card
            title="Advisory sprint"
            desc="A focused diagnostic and action plan over 2 to 4 weeks, ending with a clear roadmap and owner-level priorities."
          />
          <Card
            title="Operating partnership"
            desc="Hands-on leadership support for 6 to 12+ weeks to build the system, align the team, and drive execution."
          />
          <Card
            title="Executive advisory"
            desc="Ongoing support for CEOs and leadership teams, with a cadence that fits the pace and complexity of the business."
          />
        </div>
      </Section>
    </main>
  );
}
