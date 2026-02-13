import Image from "next/image";
import Section from "@/components/Section";

export default function AboutPage() {
  return (
    <main className="container-pad mx-auto max-w-6xl py-14 sm:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="max-w-xl">
          <p className="kicker">About</p>
          <h1 className="h1 mt-4">A distinctive, operator-led advisory platform.</h1>
          <p className="p mt-5">
            Kebek Ventures brings senior operating judgment to companies navigating scale and complexity.
            The firm was built for leaders who want clarity, speed, and direct accountability, without the overhead of large consulting machinery.
          </p>

          <Section
            title="What Kebek Ventures believes"
            subtitle="Simple principles that make engagements effective."
          >
            <div className="grid gap-5">
              <div className="card p-6">
                <h3 className="h3 text-lg">Be practical</h3>
                <p className="p-sm mt-2">
                  Strategy is only useful if it translates into decisions, owners, and execution.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="h3 text-lg">Respect the system</h3>
                <p className="p-sm mt-2">
                  Growth breaks systems. We diagnose structure, incentives, and operating rhythms, then rebuild for durability.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="h3 text-lg">Stay human</h3>
                <p className="p-sm mt-2">
                  The work is intense. The best results come from clarity, trust, and a sense of forward motion.
                </p>
              </div>
            </div>
          </Section>
        </div>

        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/redwoods-original.png"
              alt="Redwoods original photo"
              width={1600}
              height={1200}
              className="h-[320px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
          </div>

          <div className="card p-6 sm:p-7">
            <h3 className="h3">Leadership</h3>
            <p className="p-sm mt-2">
              Leading the team is Steve Carlin, a global commercial and operating executive with leadership experience across AI platforms, automation, consumer, and global go-to-market.
              He was a two-time CEO and a Venture Partner at Translink Capital.
            </p>
          </div>

          {/* KV Logo */}
          <div className="flex justify-center">
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
    </main>
  );
}
