import Link from "next/link";

export default function ContactPage() {
  const email = "scarlin22@gmail.com";
  const subject = encodeURIComponent("Kebek Ventures inquiry");
  const body = encodeURIComponent(
    "Hi Steve,\n\nI came across Kebek Ventures and would like to discuss a potential engagement.\n\nContext:\n- Company:\n- Stage/size:\n- What is happening now (inflection point):\n- What you need help with:\n- Timeline:\n\nBest,\n"
  );
  return (
    <main className="container-pad mx-auto max-w-4xl py-14 sm:py-20">
      <p className="kicker">Contact</p>
      <h1 className="h1 mt-4">Start a conversation.</h1>
      <p className="p mt-5">
        Kebek Ventures is selective by design. If you are at an inflection point and want operating and commercial clarity,
        send a note with a bit of context and we will respond quickly.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="card p-7">
          <h2 className="h3">Email</h2>
          <p className="p-sm mt-2">The fastest way to get started.</p>
          <a
            className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
            href={`mailto:${email}?subject=${subject}&body=${body}`}
          >
            Email Kebek Ventures
          </a>
          <p className="p-sm mt-4 text-black/60">{email}</p>
        </div>

        <div className="card p-7">
          <h2 className="h3">Based in</h2>
          <p className="p-sm mt-2">San Francisco, California</p>
          <p className="p-sm mt-5">
            Typical engagements span growth-stage companies through large enterprises, from early revenue through multi-billion dollar platforms.
          </p>
          <Link className="mt-5 inline-flex text-sm font-semibold text-ember hover:underline" href="/where-we-help">
            See where we help
          </Link>
        </div>
      </div>
    </main>
  );
}
