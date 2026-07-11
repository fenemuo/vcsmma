import type { Metadata } from "next";
import Link from "next/link";
import AlgorithmCard from "@/app/components/learn/AlgorithmCard";
import ComparisonTable from "@/app/components/learn/cpu/ComparisonTable";
import GanttChart from "@/app/components/learn/cpu/GanttChart";
import PracticeCard from "@/app/components/learn/cpu/PracticeCard";
import CTA from "@/app/components/learn/cpu/CTA";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Cpu,
  PlayCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "CPU Scheduling | VCSMMA",
  description:
    "Learn CPU Scheduling Algorithms interactively with examples and simulations.",
};

const metrics = [
  {
    title: "Arrival Time (AT)",
    description:
      "The time a process enters the ready queue and becomes available for execution.",
    formula: "AT",
  },
  {
    title: "Burst Time (BT)",
    description:
      "The total CPU execution time required for a process to complete.",
    formula: "BT",
  },
  {
    title: "Waiting Time (WT)",
    description:
      "The amount of time a process waits before getting CPU time.",
    formula: "WT = ST − AT",
  },
  {
    title: "Turnaround Time (TAT)",
    description:
      "The total time from process arrival until completion.",
    formula: "TAT = CT − AT",
  },
  {
    title: "Completion Time (CT)",
    description:
      "The time at which a process finishes execution.",
    formula: "CT = ST + BT",
  },
  {
    title: "Response Time (RT)",
    description:
      "Time between arrival and the first CPU allocation.",
    formula: "RT = First Start − AT",
  },
];

const algorithms = [
  {
    id: "fcfs",
    title: "First Come First Served (FCFS)",
    difficulty: "Beginner",
    type: "Non-Preemptive",
    color: "bg-emerald-500/20 text-emerald-400",
    description:
      "FCFS executes processes strictly in the order they arrive in the ready queue. Once a process begins execution, it runs until completion without interruption.",
    example: [
      "P1  AT=0  BT=5",
      "P2  AT=1  BT=3",
      "P3  AT=2  BT=2",
      "",
      "Execution Order:",
      "P1 → P2 → P3",
    ],
    advantages: [
      "Very simple to implement.",
      "Fair based on arrival order.",
      "No starvation.",
    ],
    disadvantages: [
      "Poor average waiting time.",
      "Convoy effect.",
      "Not suitable for interactive systems.",
    ],
  },

  {
    id: "sjf",
    title: "Shortest Job First (SJF)",
    difficulty: "Intermediate",
    type: "Non-Preemptive",
    color: "bg-blue-500/20 text-blue-400",
    description:
      "SJF always chooses the process with the smallest burst time among the available processes.",
    example: [
      "P1  BT=6",
      "P2  BT=2",
      "P3  BT=4",
      "",
      "Execution:",
      "P2 → P3 → P1",
    ],
    advantages: [
      "Minimum average waiting time.",
      "Efficient CPU utilization.",
      "Good for batch systems.",
    ],
    disadvantages: [
      "Requires burst time prediction.",
      "Long jobs may starve.",
      "Difficult to implement accurately.",
    ],
  },

  {
    id: "priority",
    title: "Priority Scheduling",
    difficulty: "Intermediate",
    type: "Preemptive / Non-Preemptive",
    color: "bg-orange-500/20 text-orange-400",
    description:
      "Processes are executed according to their priority. Higher priority processes are scheduled before lower priority processes.",
    example: [
      "P1 Priority=3",
      "P2 Priority=1",
      "P3 Priority=2",
      "",
      "Execution:",
      "P2 → P3 → P1",
    ],
    advantages: [
      "Suitable for real-time systems.",
      "Critical tasks execute first.",
      "Flexible scheduling.",
    ],
    disadvantages: [
      "Starvation possible.",
      "Needs aging technique.",
      "Priority inversion may occur.",
    ],
  },

  {
    id: "round-robin",
    title: "Round Robin (RR)",
    difficulty: "Intermediate",
    type: "Preemptive",
    color: "bg-purple-500/20 text-purple-400",
    description:
      "Each process receives a fixed time quantum. If it is not finished when the quantum expires, it returns to the end of the ready queue.",
    example: [
      "Quantum = 3ms",
      "",
      "P1 → P2 → P3 → P1",
    ],
    advantages: [
      "Very responsive.",
      "Fair allocation.",
      "No starvation.",
    ],
    disadvantages: [
      "High context switching.",
      "Performance depends on quantum size.",
      "Less efficient for batch jobs.",
    ],
  },
];

const objectives = [
  "Explain CPU Scheduling concepts.",
  "Understand scheduling metrics.",
  "Calculate Waiting & Turnaround Time.",
  "Interpret Gantt Charts.",
  "Compare scheduling algorithms.",
  "Prepare for quiz and simulator exercises.",
];

const sections = [
  "Overview",
  "Objectives",
  "Key Metrics",
  "FCFS",
  "SJF",
  "Priority",
  "Round Robin",
  "Comparison",
  "Practice",
];

export default function CpuSchedulingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl">

        {/* ================= SIDEBAR ================= */}

        <aside className="sticky top-20 hidden h-screen w-72 border-r border-slate-800 bg-slate-950 p-8 lg:block">
          <div className="flex items-center gap-2">
            <Cpu className="text-emerald-400" />
            <h2 className="font-bold text-xl">CPU Scheduling</h2>
          </div>

          <nav className="mt-8 space-y-3">
            {sections.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="block rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-900 hover:text-emerald-400"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* ================= CONTENT ================= */}

        <div className="flex-1">

          {/* HERO */}

          <section
            id="overview"
            className="relative overflow-hidden border-b border-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-slate-950 to-cyan-500/10" />

            <div className="relative mx-auto max-w-5xl px-6 py-24">

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                <BookOpen size={16} />
                Learning Module
              </div>

              <h1 className="mt-6 text-5xl font-extrabold">
                CPU Scheduling
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Algorithms
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Learn how an Operating System allocates CPU time to processes.
                Explore scheduling algorithms, visualize execution order,
                understand performance metrics and practice using our
                interactive simulator.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/simulator"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold transition hover:bg-emerald-400"
                >
                  <PlayCircle size={18} />
                  Launch Simulator
                </Link>

                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 transition hover:border-emerald-400"
                >
                  Take Quiz
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="mt-16 grid gap-4 sm:grid-cols-3">

                <StatCard value="5" title="Algorithms" />

                <StatCard value="Interactive" title="Learning" />

                <StatCard value="100%" title="Visual Examples" />

              </div>
            </div>
          </section>

          {/* OBJECTIVES */}

          <section
            id="objectives"
            className="mx-auto max-w-5xl px-6 py-20"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" />
              <h2 className="text-3xl font-bold">
                Learning Objectives
              </h2>
            </div>

            <p className="mt-4 text-slate-400">
              By the end of this lesson, you should be able to:
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {objectives.map((objective) => (
                <div
                  key={objective}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <CheckCircle2 className="mt-1 text-emerald-400" size={18} />

                  <p>{objective}</p>
                </div>
              ))}

            </div>
          </section>

          {/* METRICS */}

          <section
            id="key-metrics"
            className="mx-auto max-w-6xl px-6 pb-24"
          >
            <div className="flex items-center gap-3">
              <Clock3 className="text-cyan-400" />
              <h2 className="text-3xl font-bold">
                Key Scheduling Metrics
              </h2>
            </div>

            <p className="mt-4 text-slate-400">
              These are the fundamental measurements used when analysing
              CPU Scheduling Algorithms.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {metrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
              ))}

            </div>
          </section>

          {/* ALGORITHMS */}
          
          <section
  id="algorithms"
  className="mx-auto max-w-6xl space-y-10 px-6 pb-24"
>
  <div>
    <h2 className="text-4xl font-bold">
      CPU Scheduling Algorithms
    </h2>

    <p className="mt-3 text-slate-400">
      Study each scheduling algorithm, understand how it works,
      explore its advantages and disadvantages, and then practice
      using the simulator.
    </p>
  </div>

  {algorithms.map((algorithm) => (
    <AlgorithmCard
      key={algorithm.id}
      {...algorithm}
    />
  ))}
          </section>

        <div className="mx-auto max-w-6xl space-y-10 px-6 pb-24">
          <GanttChart />

          <ComparisonTable />

          <PracticeCard />

          <CTA />
        </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({
  value,
  title,
}: {
  value: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-3xl font-bold text-emerald-400">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {title}
      </p>
    </div>
  );
}

function MetricCard({
  title,
  description,
  formula,
}: {
  title: string;
  description: string;
  formula: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-4 text-slate-400">
        {description}
      </p>

      <div className="mt-6 rounded-lg bg-slate-950 p-3 font-mono text-cyan-400">
        {formula}
      </div>
    </div>
  );
}