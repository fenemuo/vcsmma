import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 via-slate-900 to-slate-950 p-16 text-center">

      <h2 className="text-5xl font-bold text-white">

        Ready to Practice?

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">

        Put your knowledge into practice by experimenting with
        interactive memory allocation simulations and observe
        how each algorithm behaves under different scenarios.

      </p>

      <Link
        href="/simulator"
        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-500"
      >
        Open Memory Simulator
        <ArrowRight />
      </Link>

    </section>
  );
}