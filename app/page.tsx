import type { Metadata } from "next";
import { exampleFcfsResult } from "@/lib/algorithms/fcfs";

export const metadata: Metadata = {
  title: "Home — VCSMMA",
  description: "Welcome to VCSMMA, your interactive lab for operating systems learning.",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Welcome to VCSMMA
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Start exploring the dashboard, simulators, learning content, quiz tools, and your profile.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <h2 className="text-2xl font-semibold tracking-tight text-white">FCFS Example Result</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900/90 p-4 text-sm text-slate-200">
          {JSON.stringify(exampleFcfsResult, null, 2)}
        </pre>
      </section>
    </main>
  );
}
