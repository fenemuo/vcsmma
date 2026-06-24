import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn — VCSMMA",
  description: "Browse tutorials, guides, and educational content for operating systems concepts.",
};

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Learn
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Explore curated learning paths and deep dives into operating system fundamentals.
        </p>
      </section>

      {/* CPU Scheduling Section */}
      <section
        id="cpu-scheduling-breakdown"
        className="space-y-6 rounded-2xl border border-slate-800/50 bg-slate-900/50 p-8 text-slate-100"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">CPU Scheduling Algorithms</h2>
          <p className="text-slate-400">
            Learn how different CPU scheduling algorithms work and how key metrics like waiting time and turnaround time are calculated.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-300">Arrival Time</h4>
              <p className="text-slate-300 text-sm mt-1">
                The time at which a process arrives in the ready queue and is available for execution.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-300">Burst Time</h4>
              <p className="text-slate-300 text-sm mt-1">
                The total amount of CPU time required by a process to complete its execution.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-300">Start Time</h4>
              <p className="text-slate-300 text-sm mt-1">
                The time when a process begins execution on the CPU. Formula: <code className="bg-slate-700 px-2 py-1 rounded text-xs">max(Arrival Time, Current CPU Time)</code>
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-300">Completion Time (Finish Time)</h4>
              <p className="text-slate-300 text-sm mt-1">
                The time when a process finishes execution. Formula: <code className="bg-slate-700 px-2 py-1 rounded text-xs">Start Time + Burst Time</code>
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-300">Waiting Time</h4>
              <p className="text-slate-300 text-sm mt-1">
                The total time a process spends waiting in the ready queue before execution. Formula: <code className="bg-slate-700 px-2 py-1 rounded text-xs">Start Time - Arrival Time</code> or <code className="bg-slate-700 px-2 py-1 rounded text-xs">Turnaround Time - Burst Time</code>
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-300">Turnaround Time</h4>
              <p className="text-slate-300 text-sm mt-1">
                The total time from arrival to completion. Formula: <code className="bg-slate-700 px-2 py-1 rounded text-xs">Completion Time - Arrival Time</code>
              </p>
            </div>
          </div>
        </div>

        {/* FCFS */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">FCFS (First Come First Served)</h3>
          <p className="text-slate-300">
            Processes are executed in the order they arrive. The CPU is allocated to the process that arrived first.
          </p>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <p className="text-sm font-mono text-slate-200">
              Example: If P1 arrives at 0 and needs 5ms, P2 arrives at 1 and needs 3ms:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• P1 starts at max(0, 0) = 0, finishes at 0 + 5 = 5</li>
              <li>• P2 starts at max(5, 1) = 5, finishes at 5 + 3 = 8</li>
              <li>• P1 waiting: 0 - 0 = 0</li>
              <li>• P2 waiting: 5 - 1 = 4</li>
            </ul>
          </div>
        </div>

        {/* SJF */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">SJF (Shortest Job First)</h3>
          <p className="text-slate-300">
            Among available processes, the one with the shortest burst time is executed first. This minimizes average waiting time.
          </p>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <p className="text-sm font-mono text-slate-200">
              Example: If P1 arrives at 0 (5ms), P2 arrives at 1 (3ms), P3 arrives at 2 (4ms):
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• At time 0: P1 available, execute P1 (0-5)</li>
              <li>• At time 5: P2, P3 available, P2 has shorter burst (3 &lt; 4), execute P2 (5-8)</li>
              <li>• At time 8: P3 available, execute P3 (8-12)</li>
            </ul>
          </div>
        </div>

        {/* Round Robin */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Round Robin (RR)</h3>
          <p className="text-slate-300">
            Each process gets a fixed time slice (quantum) on the CPU. If not finished, it goes to the back of the ready queue.
          </p>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <p className="text-sm font-mono text-slate-200">
              Example: Quantum = 4ms, P1 (5ms), P2 (3ms), P3 (4ms):
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• 0-4: P1 (remaining: 1ms)</li>
              <li>• 4-7: P2 (remaining: 0ms, done)</li>
              <li>• 7-11: P3 (remaining: 0ms, done)</li>
              <li>• 11-12: P1 (remaining: 0ms, done)</li>
              <li>• Multiple start times indicate when process runs during its quantum slices</li>
            </ul>
          </div>
        </div>

        {/* Priority Scheduling */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Priority Scheduling</h3>
          <p className="text-slate-300">
            Among available processes, the one with the lowest priority number (highest priority) is executed first.
          </p>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <p className="text-sm font-mono text-slate-200">
              Example: P1 arrives at 0 (priority 3, 5ms), P2 arrives at 1 (priority 1, 3ms):
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• At time 0: Only P1 available, execute P1 (0-5)</li>
              <li>• At time 5: P2 available (priority 1 &lt; 3), execute P2 (5-8)</li>
              <li>• Lower priority number = Higher priority (executes first)</li>
            </ul>
          </div>
        </div>

        {/* Link back to simulator */}
        <div className="mt-6 pt-6 border-t border-slate-700">
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Try the Simulator →
          </Link>
        </div>
      </section>

      {/* Implementation Documentation Link */}
      <section className="mt-12 rounded-2xl border border-slate-800/50 bg-slate-900/50 p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Chapter 4: Implementation Documentation</h2>
            <p className="text-slate-400 mb-4">
              Complete technical documentation covering system architecture, technology stack, algorithm implementations, and design decisions.
            </p>
            <Link
              href="/learn/implementation"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Read Implementation Guide →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
