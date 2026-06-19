import type { Metadata } from "next";
import Link from "next/link";
import MainHero from "./components/ui/MainHero";
import ExploreGrid from "./components/ui/ExploreGrid";

export const metadata: Metadata = {
  title: "Home — VCSMMA",
  description: "VCSMMA — interactive operating systems lab: simulators, quizzes, and learning.",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:py-24">
      <MainHero />

      <section className="animated-border mt-12 rounded-3xl p-1">
        <div className="inner rounded-3xl bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
                OS Lab Hub
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Explore the lab tools designed for hands-on learning.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                Dive into simulators, practice quizzes, and guided lessons with a modern OS lab experience.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-auto">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
                <p className="font-semibold text-white">CPU Scheduling</p>
                <p className="mt-2 text-xs text-slate-400">Visualize FCFS, SJF, Round Robin, Priority, SRTF.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
                <p className="font-semibold text-white">Memory & Paging</p>
                <p className="mt-2 text-xs text-slate-400">Compare allocation and page replacement strategies.</p>
              </div>
            </div>
          </div>

          <ExploreGrid
            items={[
              { href: "/simulator", title: "Simulators", description: "Interactive CPU & memory simulators — try FCFS, SJF, and more." },
              { href: "/quiz", title: "Quizzes", description: "Test your knowledge with topic-focused quizzes." },
              { href: "/learn", title: "Learning", description: "Guides and explanations to the underlying OS algorithms." },
              { href: "/dashboard", title: "Dashboard", description: "Overview of your activity, saved simulations, and progress." },
              { href: "/simulators", title: "Component Library", description: "Prebuilt UI components and charts for visualizing simulations." },
              { href: "/profile", title: "Profile", description: "Track learning progress and saved simulations." },
            ]}
          />
        </div>
      </section>

      <section className="mt-12 text-center text-sm text-slate-400">
        <p>Built with Next.js • Prisma • Recharts • TailwindCSS by <Link href="https://linkedin.com/in/franc-enemuo" className="text-slate-800 hover:text-indigo-600 hover:underline font-bold">Francis Enemuo</Link></p>
      </section>
    </main>
  );
}
