import Link from "next/link";
import { Cpu, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-20">

      {/* Background Glow */}
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          <Cpu size={18} />
          Memory Management
        </div>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Learn Memory
          <span className="block text-emerald-400">
            Management Algorithms
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          Understand how an Operating System allocates,
          manages and optimizes memory through interactive
          visualizations of First Fit, Best Fit and Worst Fit
          allocation strategies.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/simulator"
            className="rounded-xl bg-emerald-600 px-7 py-4 font-medium text-white transition hover:bg-emerald-500"
          >
            Launch Simulator
          </Link>

          <Link
            href="#overview"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-4 text-slate-300 transition hover:border-emerald-500 hover:text-white"
          >
            Learn More
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}