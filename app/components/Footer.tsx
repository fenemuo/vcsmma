import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950/95 px-4 py-10 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-base font-semibold text-white">Ready to cement your OS skills?</p>
          <p className="max-w-2xl text-sm text-slate-400">
            Launch the simulator, explore lessons, or review quizzes — your interactive lab experience starts here.
          </p>
          <Link
            href="/simulator"
            className="inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition duration-200 hover:bg-indigo-500"
            target="_blank"
          >
            Launch simulator
          </Link>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 text-sm shadow-2xl shadow-slate-950/20">
          <p className="font-semibold text-white">Quick links</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <Link href="/" className="rounded-2xl bg-slate-900/80 px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              Home
            </Link>
            <Link href="/dashboard" className="rounded-2xl bg-slate-900/80 px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              Dashboard
            </Link>
            <Link href="/profile" className="rounded-2xl bg-slate-900/80 px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              Profile
            </Link>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} VCSMMA — Interactive OS learning tools.</p>
          <p className="text-xs text-slate-500">Built with Next.js • Prisma • Recharts • TailwindCSS by <Link href="https://linkedin.com/in/franc-enemuo" className="text-slate-300 transition hover:text-white hover:underline font-semibold">Francis Enemuo</Link></p>
        </div>
      </div>
    </footer>
  );
}
