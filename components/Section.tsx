import Link from "next/link";

export default function Section({
  kicker,
  title,
  subtitle,
  children,
  cta,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="container-pad mx-auto max-w-6xl py-12 sm:py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-3xl">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="h2 mt-3">{title}</h2>
          {subtitle ? <p className="p mt-4">{subtitle}</p> : null}
        </div>
        {cta ? (
          <Link className="btn-ghost w-fit" href={cta.href}>
            {cta.label}
          </Link>
        ) : null}
      </div>

      <div className="mt-8">{children}</div>
    </section>
  );
}
