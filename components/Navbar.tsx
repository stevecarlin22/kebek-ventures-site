import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <div className="container-pad mx-auto max-w-6xl flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-white font-semibold tracking-tight text-lg"
        >
          Kebek Ventures
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold text-white/90">
          <Link href="/experience" className="hover:text-white">
            Experience
          </Link>
          <Link href="/where-we-help" className="hover:text-white">
            Where we help
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
