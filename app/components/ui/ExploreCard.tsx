import Link from "next/link";

type ExploreCardProps = {
  href: string;
  title: string;
  description: string;
  delay?: number;
};

export default function ExploreCard({ href, title, description, delay = 0 }: ExploreCardProps) {
  return (
    <Link
      href={href}
      style={{ animationDelay: `${delay}ms` }}
      className="fade-in-up group block overflow-hidden rounded-[28px] border border-slate-800/90 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 transition-transform duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/20 transition group-hover:bg-indigo-500/25">
          →
        </span>
      </div>
    </Link>
  );
}
