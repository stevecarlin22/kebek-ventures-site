import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-pad mx-auto max-w-6xl py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">Kebek Ventures</p>
          <p className="p-sm mt-1">Advisory for scale, clarity, and repeatable growth.</p>
          <p className="p-sm mt-2 text-black/50">© {new Date().getFullYear()} Kebek Ventures, LLC</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/where-we-help" className="text-black/70 hover:text-black">Where we help</Link>
          <Link href="/experience" className="text-black/70 hover:text-black">Experience</Link>
          <Link href="/about" className="text-black/70 hover:text-black">About</Link>
          <Link href="/contact" className="text-black/70 hover:text-black">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
