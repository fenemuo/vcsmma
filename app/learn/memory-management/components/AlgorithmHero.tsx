import { Clock3, Cpu, Layers3 } from "lucide-react";

interface AlgorithmHeroProps {
  title: string;
  subtitle: string;
  description: string;
  color: "blue" | "emerald" | "purple" | "rose";
  complexity: string;
}

const gradients = {
  blue: "from-blue-600 via-cyan-500 to-sky-400",
  emerald: "from-emerald-600 via-green-500 to-teal-400",
  purple: "from-purple-600 via-pink-500 to-fuchsia-400",
  rose: "from-rose-600 via-pink-500 to-fuchsia-400",
};

export default function AlgorithmHero({
  title,
  subtitle,
  description,
  color,
  complexity,
}: AlgorithmHeroProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[color]} p-10 lg:p-16`}
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 max-w-4xl">

        <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur">
          {subtitle}
        </span>

        <h1 className="mt-6 text-5xl font-bold text-white lg:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
          {description}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <Cpu className="mb-3 text-white" />
            <p className="text-sm text-slate-200">Category</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              Dynamic Allocation
            </h3>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <Clock3 className="mb-3 text-white" />
            <p className="text-sm text-slate-200">Time Complexity</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              {complexity}
            </h3>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <Layers3 className="mb-3 text-white" />
            <p className="text-sm text-slate-200">Memory Type</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              Contiguous
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}