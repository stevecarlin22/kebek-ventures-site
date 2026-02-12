import Section from "@/components/Section";
import { experience, metrics, expertise } from "@/content/experience";
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <main className="container-pad mx-auto max-w-6xl py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="kicker">Experience</p>
        <h1 className="h1 mt-4">Operating, growth, and go-to-market leadership.</h1>
        <p className="p mt-5">
          Kebek Ventures is grounded in real operator experience across AI platforms, automation, consumer, and global go-to-market.
          The work spans early-stage scaling through multi-billion dollar platforms.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn-primary" href="/contact">Discuss an engagement</Link>
          <Link className="btn-ghost" href="/about">About the firm</Link>
        </div>
      </div>

      <Section title="Selected outcomes" subtitle="A few indicators of operating scale and impact.">
        <div className="grid gap-5 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="card p-6">
              <p className="kicker">{m.label}</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{m.value}</p>
              <p className="p-sm mt-2">{m.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Core expertise" subtitle="The themes we repeatedly see and fix.">
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {expertise.map((e) => (
              <span key={e} className="rounded-full bg-black/5 px-3 py-1 text-sm text-black/70">
                {e}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Career highlights" subtitle="A compact narrative pulled from the CV.">
        <div className="grid gap-5">
          {experience.map((r) => (
            <div key={r.role} className="card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h3 className="h3">{r.role}</h3>
                <p className="text-sm text-black/55">{r.time} · {r.location}</p>
              </div>
              <p className="mt-3 text-sm font-semibold text-black/70">{r.company}</p>
              <ul className="mt-4 space-y-2 text-black/75">
                {r.bullets.map((b) => (
                  <li key={b} className="leading-relaxed">• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
