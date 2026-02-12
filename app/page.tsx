import Image from "next/image";
import Link from "next/link";
import { blocks, logos } from "@/content/site";
import Section from "@/components/Section";
import Card from "@/components/Card";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
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
      </section>

      {/* Credibility */}
      <Section
        title="A career built in serious operating environments"
        kicker="Credibility"
        subtitle="Experience across consumer, platforms, AI, automation, and global go-to-market."
      >
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-80">
            {logos.map((l) => (
              <span key={l} className="text-sm font-semibold tracking-tight text-black/70">
                {l}
              </span>
            ))}
          </div>
          <p className="p-sm mt-4">
            Logos are listed for biography and experience context. No endorsement implied.
          </p>
        </div>
      </Section>

      {/* What we do */}
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

      {/* Where we help */}
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

      {/* Visual rhythm */}
      <section className="container-pad mx-auto max-w-6xl py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl shadow-lift">
          <Image
            src="/images/golden-gate.png"
            alt="Golden Gate Bridge"
            width={2400}
            height={1200}
            className="h-[280px] sm:h-[340px] md:h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/35" />
          <div className="absolute inset-0 p-6 sm:p-10 flex items-end">
            <div className="max-w-xl">
              <p className="kicker text-white/80">Systems thinking</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Clear thinking, clean execution.
              </h2>
              <p className="mt-3 text-white/80">
                Kebek Ventures helps leadership teams separate signal from noise,
                align the organization, and build systems that scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thought leadership */}
      <Section
        title="Writing and appearances"
        kicker="Thought leadership"
        subtitle="A small selection from the current site. More can be added as needed."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.thoughtLeadership.map((b) => (
            <div key={b.title} className="card p-6">
              <p className="kicker">{b.outlet}</p>
              <h3 className="h3 mt-3 text-lg">{b.title}</h3>
              <p className="p-sm mt-2">{b.desc}</p>
              {b.href ? (
                <a className="mt-4 inline-block text-sm font-semibold text-ember hover:underline" href={b.href} target="_blank">
                  Read
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="container-pad mx-auto max-w-6xl pb-16 sm:pb-24">
        <div className="rounded-3xl bg-ink text-white shadow-lift overflow-hidden">
          <div className="p-8 sm:p-10 md:p-12 grid gap-8 md:grid-cols-2 items-center">
            <div>
              <p className="kicker text-white/70">Engage</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                Ready to make growth feel repeatable?
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                If you are at an inflection point and want operating and commercial clarity,
                Kebek Ventures can help.
              </p>
            </div>
            <div className="flex md:justify-end gap-3 flex-wrap">
              <Link className="btn-primary" href="/contact">
                Contact
              </Link>
              <Link className="btn-ghost" href="/experience">
                View experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
