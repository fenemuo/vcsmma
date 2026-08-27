"use client";

import { useState } from "react";
import Link from "next/link";
import { fcfs } from "@/lib/algorithms/fcfs";
import { sjf } from "@/lib/algorithms/sjf";
import { roundRobin } from "@/lib/algorithms/roundRobin";
import { priorityScheduling } from "@/lib/algorithms/priority";
import { GanttChart } from "@/app/components/gantt-chart/GanttChart";
import { AlgorithmSidebar } from "@/app/components/simulator/AlgorithmSidebar";
import { CpuCalculationBreakdown } from "@/app/components/simulator/CalculationBreakdown";

interface Proc {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
}

type CpuAlgo = "fcfs" | "sjf" | "rr" | "priority";

export default function SimulatorPage() {
  const [algo, setAlgo] = useState<CpuAlgo>("fcfs");
  const [quantum, setQuantum] = useState(4);
  const [processes, setProcesses] = useState<Proc[]>([
    { id: "P1", arrival: 0, burst: 5, priority: 1 },
    { id: "P2", arrival: 1, burst: 3, priority: 2 },
    { id: "P3", arrival: 2, burst: 4, priority: 3 },
  ]);
  const [results, setResults] = useState<any[] | null>(null);
  const [timeline, setTimeline] = useState<any[]>([]);

  function selectAlgorithm(nextAlgo: CpuAlgo) {
    setAlgo(nextAlgo);
    setResults(null);
  }

  function updateProcess(index: number, key: keyof Proc, value: string | number) {
    const next = [...processes];
    if (key === "id") {
      next[index][key] = String(value);
    } else if (key === "arrival") {
      next[index].arrival = Math.max(0, Number(value) || 0);
    } else if (key === "burst") {
      next[index].burst = Math.max(1, Number(value) || 1);
    } else {
      next[index][key] = Number(value);
    }
    setProcesses(next);
    setResults(null);
  }

  function addProcess() {
    const nextId = `P${processes.length + 1}`;
    setProcesses([...processes, { id: nextId, arrival: 0, burst: 1, priority: 1 }]);
    setResults(null);
  }

  function removeProcess(index: number) {
    setProcesses(processes.filter((_, i) => i !== index));
    setResults(null);
  }

  function run() {
    switch (algo) {
      case "fcfs": {
        const simulation = fcfs(processes as any);
        setResults(simulation.results);
        setTimeline(simulation.timeline);
        break;
      }

      case "sjf": {
        const simulation = sjf(processes as any);
        setResults(simulation.results);
        setTimeline(simulation.timeline);
        break;
      }

      case "rr": {
        const simulation = roundRobin(processes, quantum);
        setResults(simulation.results);
        setTimeline(simulation.timeline);
        break;
      }

      case "priority": {
        const simulation = priorityScheduling(processes as any);
        setResults(simulation.results);
        setTimeline(simulation.timeline);
        break;
      }
    }
  }

  const averageWaiting = results && results.length
    ? results.reduce((s, r) => s + (r.waiting ?? 0), 0) / results.length
    : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-6 text-xl font-semibold text-slate-900">
        Simulators — CPU Scheduling
      </h1>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <AlgorithmSidebar algo={algo} onSelect={selectAlgorithm} />

        <section className="space-y-4 rounded-2xl border bg-slate-900 p-6 text-slate-100">
          {algo === "rr" && (
            <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <label className="font-medium">Quantum (ms)</label>
              <input
                className="w-20 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                type="number"
                min={1}
                value={quantum}
                onChange={(e) => {
                  setQuantum(Math.max(1, Number(e.target.value) || 1));
                  setResults(null);
                }}
              />
            </div>
          )}

          <div className="mt-4">
            <h2 className="font-medium">Processes</h2>
            <div className="mt-2 space-y-2">
              {processes.map((p, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <input className="w-20 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" value={p.id} onChange={(e) => updateProcess(i, "id", e.target.value)} />
                  <label className="text-sm">Arrival (ms)</label>
                  <input className="w-20 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" type="number" min={0} value={p.arrival} onChange={(e) => updateProcess(i, "arrival", e.target.value)} />
                  <label className="text-sm">Burst (ms)</label>
                  <input className="w-20 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" type="number" min={1} value={p.burst} onChange={(e) => updateProcess(i, "burst", e.target.value)} />
                  {algo === "priority" && (
                    <>
                      <label className="text-sm">Priority</label>
                      <input className="w-20 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" type="number" value={p.priority ?? 1} onChange={(e) => updateProcess(i, "priority", Number(e.target.value))} />
                    </>
                  )}
                  <button className="ml-auto rounded bg-red-600 px-2 py-1 text-sm" onClick={() => removeProcess(i)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded bg-green-600 px-3 py-1" onClick={addProcess}>Add Process</button>
              <button className="rounded bg-blue-600 px-3 py-1" onClick={run}>Run</button>
            </div>
          </div>

          {results && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Results</h3>
                <Link
                  href="/learn#cpu-scheduling-breakdown"
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  Learn how calculations work →
                </Link>
              </div>

              <div className="mt-4 mb-6">
                <h4 className="text-sm font-medium mb-3">Gantt Chart</h4>
                <GanttChart
                  blocks={timeline}
                  maxTime={timeline.length ? timeline[timeline.length - 1].end : 0}
                />
              </div>

              <div className="mt-2 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr className="text-left text-slate-300">
                      <th className="pr-4">ID</th>
                      <th className="pr-4">Arrival (ms)</th>
                      <th className="pr-4">Burst (ms)</th>
                      {algo === "priority" && <th className="pr-4">Priority</th>}
                      <th className="pr-4">Start (ms)</th>
                      <th className="pr-4">Finish (ms)</th>
                      <th className="pr-4">Waiting (ms)</th>
                      <th className="pr-4">Turnaround (ms)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, idx) => (
                      <tr key={idx} className="border-t border-slate-800">
                        <td className="py-2">{r.id}</td>
                        <td>{r.arrival}</td>
                        <td>{r.burst}</td>
                        {algo === "priority" && <td>{r.priority ?? "-"}</td>}
                        <td>{algo === "rr" ? (r.startTimes ? r.startTimes.join(", ") : "-") : r.start ?? "-"}</td>
                        <td>{r.finish}</td>
                        <td>{r.waiting}</td>
                        <td>{r.turnaround}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4">
                  <strong>Average Waiting Time:</strong> {averageWaiting.toFixed(2)} ms
                </div>
              </div>

              <div className="mt-6">
                <CpuCalculationBreakdown results={results as any} />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
