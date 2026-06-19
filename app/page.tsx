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

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Explore</h2>
            <p className="mt-2 text-sm text-slate-400">All the tools and learning resources in one place.</p>
          </div>
          <span className="rounded-full bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
            OS Lab Hub
          </span>
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
      </section>

      <section className="mt-12 text-center text-sm text-slate-400">
        <p>Built with Next.js • Prisma • Recharts • TailwindCSS</p>
      </section>
    </main>
  );
}
