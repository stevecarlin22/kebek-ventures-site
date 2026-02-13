import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const links = [
  { href: "/where-we-help", label: "Where we help" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-fog/70 border-b border-black/5">
      <div className="container-pad mx-auto max-w-6xl h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* ✅ Logo */}
          <span className="relative h-9 w-9 overflow-hidden rounded-xl border border-black/10 bg-white">
            <Image
              src="/images/logo.jpg"
              alt="Kebek Ventures"
              fill
              className="object-cover"
              priority
            />
          </span>

          {/* ✅ Wordmark */}
          <span className="font-semibold tracking-tight text-black">
            Kebek Ventures
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-sm font-semibold text-black/70 hover:text-black transition-colors"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
