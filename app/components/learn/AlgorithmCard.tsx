import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

type AlgorithmCardProps = {
  id: string;
  title: string;
  color: string;
  difficulty: string;
  type: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  example: string[];
};

export default function AlgorithmCard({
  id,
  title,
  color,
  difficulty,
  type,
  description,
  advantages,
  disadvantages,
  example,
}: AlgorithmCardProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-slate-800 bg-slate-900 p-8"
    >
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${color}`}
          >
            {difficulty}
          </span>

          <h2 className="mt-4 text-3xl font-bold">{title}</h2>

          <p className="mt-2 text-slate-400">{type}</p>
        </div>

        <Link
          href="/simulator"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium transition hover:bg-emerald-400"
        >
          Try Simulator
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Description */}

      <p className="mt-8 leading-8 text-slate-300">{description}</p>

      {/* Example */}

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <h3 className="mb-4 text-xl font-semibold">Worked Example</h3>

        <ul className="space-y-2 font-mono text-emerald-300">
          {example.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Pros / Cons */}

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        {/* Advantages */}

        <div className="rounded-2xl border border-emerald-900 bg-emerald-950/10 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-emerald-400">
            <CheckCircle2 />
            Advantages
          </h3>

          <ul className="space-y-3">
            {advantages.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  size={18}
                  className="mt-1 text-emerald-400"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disadvantages */}

        <div className="rounded-2xl border border-red-900 bg-red-950/10 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-red-400">
            <XCircle />
            Disadvantages
          </h3>

          <ul className="space-y-3">
            {disadvantages.map((item) => (
              <li key={item} className="flex gap-2">
                <XCircle
                  size={18}
                  className="mt-1 text-red-400"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}