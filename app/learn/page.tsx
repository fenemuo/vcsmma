"use client"
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Cpu,
  Database,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from "lucide-react";



const learningPaths = [
  {
    title: "CPU Scheduling",
    icon: Cpu,
    description:
      "Master FCFS, SJF, SRTF, Priority Scheduling and Round Robin through interactive lessons.",
    href: "/learn/cpu-scheduling",
    lessons: 5,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Memory Management",
    icon: Database,
    description:
      "Understand Paging, Segmentation, Virtual Memory and Page Replacement algorithms.",
    href: "/learn/memory-management",
    lessons: 4,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "System Implementation",
    icon: GraduationCap,
    description:
      "Explore the architecture, design decisions and implementation of the VCSMMA platform.",
    href: "/learn/implementation",
    lessons: 1,
    color: "from-violet-500 to-purple-500",
  },
];

const featuredAlgorithms = [
  "First Come First Served (FCFS)",
  "Shortest Job First (SJF)",
  "Round Robin",
  "Priority Scheduling",
  "Paging",
  "Segmentation",
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-slate-950 to-blue-600/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Interactive Learning Platform
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight">
              Learn Operating Systems
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Visually & Interactively
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Learn CPU Scheduling and Memory Management Algorithms through
              interactive explanations, worked examples, animations,
              simulations and quizzes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
              >
                <PlayCircle size={18} />
                Launch Simulator
              </Link>

              <Link
                href="#paths"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 transition hover:border-emerald-500"
              >
                Start Learning
              </Link>

            </div>

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">

              <StatCard
                title="Lessons"
                value="10+"
              />

              <StatCard
                title="Algorithms"
                value="8"
              />

              <StatCard
                title="Interactive"
                value="100%"
              />

              <StatCard
                title="Self-paced"
                value="Yes"
              />

            </div>

          </div>
        </div>
      </section>

      {/* LEARNING PATHS */}

      <section
        id="paths"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="text-emerald-400" />
          <h2 className="text-3xl font-bold">
            Learning Paths
          </h2>
        </div>

        <p className="mt-3 max-w-2xl text-slate-400">
          Follow structured learning modules designed to help you
          understand Operating System concepts from beginner to advanced.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {learningPaths.map((path) => {
            const Icon = path.icon;

            return (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-emerald-500"
              >
                <div
                  className={`mb-6 inline-flex rounded-2xl bg-gradient-to-r ${path.color} p-4`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold">
                  {path.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {path.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
                    {path.lessons} Lessons
                  </span>

                  <ArrowRight className="transition group-hover:translate-x-2" />

                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}

      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="flex items-center gap-3">
            <Brain className="text-cyan-400" />
            <h2 className="text-3xl font-bold">
              Featured Algorithms
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {featuredAlgorithms.map((algorithm) => (
              <div
                key={algorithm}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-emerald-500"
              >
                <Cpu className="mb-4 text-emerald-400" />

                <h3 className="font-semibold">
                  {algorithm}
                </h3>

                <p className="mt-3 text-sm text-slate-400">
                  Learn the theory, see visual execution,
                  and practice using the interactive simulator.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 p-12 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Practice?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Reinforce your understanding by experimenting with
            interactive CPU Scheduling and Memory Management
            simulations.
          </p>

          <Link
            href="/simulator"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold transition hover:bg-emerald-400"
          >
            Open Simulator
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-3xl font-bold text-emerald-400">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-400">
        {title}
      </p>
    </div>
  );
}