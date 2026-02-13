import Image from "next/image";
import Section from "@/components/Section";

export default function AboutPage() {
  return (
    <main className="container-pad mx-auto max-w-6xl py-24">
      <Section
        kicker="About"
        title="Kebek Ventures"
        subtitle="Operating perspective shaped inside complex, high-growth environments."
      >
        <div className="grid gap-10 md:grid-cols-2">
          
          {/* Left Column */}
          <div className="space-y-6 text-black/70 leading-relaxed">
            <p>
              Kebek Ventures was created to help leadership teams navigate moments
              where growth, complexity, and execution pressures collide. The firm
              operates at the intersection of strategy and operating reality,
              focusing on the structural decisions that determine whether momentum
              becomes durable performance.
            </p>

            <p>
              The work is grounded in practical operating experience across consumer,
              technology, platform, and automation-driven businesses. Engagements
              typically center on diagnosing constraints, clarifying commercial
              models, strengthening execution systems, and aligning leadership teams
              around decisions that materially impact trajectory.
            </p>

            <p>
              Kebek Ventures is intentionally selective, partnering with organizations
              where the challenges are consequential and the mandate is real.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            <div className="card p-6">
              <p className="kicker">Principle</p>
              <p className="mt-2 text-black/70 leading-relaxed">
                Enduring value creation is rarely constrained by ideas. It is
                constrained by clarity, alignment, and disciplined execution.
                Kebek Ventures focuses on strengthening the systems that allow
                organizations to scale intelligently.
              </p>
            </div>

            {/* Logo Placement */}
            <div className="mt-10 flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 opacity-95">
                <Image
                  src="/images/logo.jpg"
                  alt="Kebek Ventures"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </Section>
    </main>
  );
}
