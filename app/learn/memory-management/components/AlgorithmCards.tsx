import Link from "next/link";
import { ArrowRight } from "lucide-react";

const algorithms = [
  {
    title: "First Fit",
    description:
      "Allocates the first free memory block that is large enough to satisfy the request.",
    color: "from-blue-500 to-cyan-500",
    href: "/learn/memory-management/first-fit",
  },
  {
    title: "Best Fit",
    description:
      "Allocates the smallest available block that can accommodate the process, minimizing wasted space.",
    color: "from-emerald-500 to-green-500",
    href: "/learn/memory-management/best-fit",
  },
  {
    title: "Worst Fit",
    description:
      "Allocates the largest available block, leaving larger remaining free spaces.",
    color: "from-purple-500 to-pink-500",
    href: "/learn/memory-management/worst-fit",
  },
];

export default function AlgorithmCards() {
  return (
    <section className="space-y-12">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">
          Memory Allocation Algorithms
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-400">
          Different allocation strategies produce different memory
          utilization patterns and fragmentation characteristics.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {algorithms.map((algo) => (

          <div
            key={algo.title}
            className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-3 hover:border-emerald-500"
          >

            <div
              className={`h-2 bg-gradient-to-r ${algo.color}`}
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold text-white">

                {algo.title}

              </h3>

              <p className="mt-6 leading-8 text-slate-400">

                {algo.description}

              </p>

              <Link
                href={algo.href}
                className="mt-8 inline-flex items-center gap-2 font-medium text-emerald-400 transition hover:gap-4"
              >

                Learn Algorithm

                <ArrowRight size={20} />

              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}