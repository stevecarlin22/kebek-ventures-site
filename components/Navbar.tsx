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
          <Image
            src="/images/logo.jpg"
            alt="Kebek Ventures"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <span className="text-sm font-semibold tracking-tight">Kebek Ventures</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-black/70 hover:text-black">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Link href="/contact" className={clsx("btn-primary", "py-2 px-4 text-xs")}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
