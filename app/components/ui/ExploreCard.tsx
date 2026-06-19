import Link from "next/link";

export default function ExploreCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950/70 p-6 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-slate-700"
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
    </Link>
  );
}
