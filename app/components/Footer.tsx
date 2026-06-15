import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95 px-4 py-5 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} VCSMMA. Built for interactive operating systems learning.</p>
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/profile" className="transition hover:text-white">
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
}
