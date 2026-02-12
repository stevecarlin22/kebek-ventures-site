import Image from "next/image";
import Link from "next/link";
import { blocks, logos } from "@/content/site";
import Section from "@/components/Section";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/redwoods.jpg"
            alt="Redwood stand in daylight"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative container-pad mx-auto max-w-6xl pt-24 sm:pt-28 pb-14 sm:pb-20">
          <div className="max-w-3xl">
            <p className="kicker text-white/80">Kebek Ventures</p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
              Advisory for scale, clarity, and repeatable growth.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/80">
              Kebek Ventures supports leadership teams at moments of inflection,
              when growth is real but the system is not yet durable. We bring
              operating and commercial discipline to help organizations move from
              momentum to repeatability. Experience spans early revenue through
              $3B+ platforms.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/contact">
                Start a conversation
              </Link>
              <Link className="btn-ghost" href="/where-we-help">
                Where we help
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="A career built in serious operating environments"
        kicker="Credibility"
        subtitle="Experience across consumer, platforms, AI, automation, and global go-to-market."
      >
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-80">
            {logos.map((l) => (
              <span
                key={l}
                className="text-sm font-semibold tracking-tight text-black/70"
              >
                {l}
              </span>
            ))}
          </div>
          <p className="p-sm mt-4">
            Logos are listed for biography and experience context. No endorsement implied.
          </p>
        </div>
      </Section>

      <Section
        title="Operator-grade help, not consultant theater"
        kicker="Approach"
        subtitle="We work in the messy middle: real growth, real constraints, and decisions that matter."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.approach.map((b) => (
            <Card key={b.title} title={b.title} desc={b.desc} />
          ))}
        </div>
      </Section>

      <Section
        title="Where we help"
        kicker="Focus"
        subtitle="Common situations where Kebek Ventures creates outsized leverage."
        cta={{ label: "Explore focus areas", href: "/where-we-help" }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {blocks.whereWeHelp.map((b) => (
            <div key={b.title} className="card p-6 sm:p-7">
              <h3 className="h3">{b.title}</h3>
              <p className="p-sm mt-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-pad mx-auto max-w-6xl py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl shadow-lift">
          <Image
            src="/images/golden-gate.png"
            alt="Golden Gate Bridge"
            width={2400}
