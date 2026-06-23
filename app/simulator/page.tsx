"use client";

import { useState } from "react";
import { fcfs } from "@/lib/algorithms/fcfs";
import { sjf } from "@/lib/algorithms/sjf";
import { roundRobin } from "@/lib/algorithms/roundRobin";
import { priorityScheduling } from "@/lib/algorithms/priority";

interface Proc {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
}

type Algo = "fcfs" | "sjf" | "rr" | "priority";

export default function SimulatorPage() {
  const [algo, setAlgo] = useState<Algo>("fcfs");
  const [quantum, setQuantum] = useState(4);
  const [processes, setProcesses] = useState<Proc[]>([
    { id: "P1", arrival: 0, burst: 5, priority: 1 },
    { id: "P2", arrival: 1, burst: 3, priority: 2 },
    { id: "P3", arrival: 2, burst: 4, priority: 3 },
  ]);
  const [results, setResults] = useState<any[] | null>(null);

  function updateProcess(index: number, key: keyof Proc, value: string | number) {
    const next = [...processes];
    // @ts-ignore
    next[index][key] = key === "id" ? String(value) : Number(value);
    setProcesses(next);
  }

  function addProcess() {
    const nextId = `P${processes.length + 1}`;
    setProcesses([...processes, { id: nextId, arrival: 0, burst: 1, priority: 1 }]);
  }

  function removeProcess(index: number) {
    const next = processes.filter((_, i) => i !== index);
    setProcesses(next);
  }

  function run() {
    let res: any[] = [];
    if (algo === "fcfs") {
      res = fcfs(processes as any);
    } else if (algo === "sjf") {
      res = sjf(processes as any);
    } else if (algo === "rr") {
      res = roundRobin(processes as any, quantum);
    } else if (algo === "priority") {
      res = priorityScheduling(processes as any);
    }
    setResults(res);
  }

  const averageWaiting = results && results.length
    ? results.reduce((s, r) => s + (r.waiting ?? 0), 0) / results.length
    : 0;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section className="space-y-4 rounded-2xl border bg-slate-900 p-6 text-slate-100">
        <h1 className="text-xl font-semibold">Simulators — CPU Scheduling</h1>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" checked={algo === "fcfs"} onChange={() => setAlgo("fcfs")} /> FCFS
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={algo === "sjf"} onChange={() => setAlgo("sjf")} /> SJF
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={algo === "rr"} onChange={() => setAlgo("rr")} /> Round Robin
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={algo === "priority"} onChange={() => setAlgo("priority")} /> Priority scheduling
          </label>
        </div>

        {algo === "rr" && (
          <div className="mt-4 flex items-center gap-2">
            <label className="font-medium">Quantum (ms)</label>
            <input
              className="w-20 rounded p-1 text-black"
              type="number"
              min={1}
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
            />
          </div>
        )}

        <div className="mt-4">
          <h2 className="font-medium">Processes</h2>
          <div className="mt-2 space-y-2">
            {processes.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className="w-20 rounded p-1 text-black" value={p.id} onChange={(e) => updateProcess(i, "id", e.target.value)} />
                <label className="text-sm">Arrival</label>
                <input className="w-20 rounded p-1 text-black" type="number" value={p.arrival} onChange={(e) => updateProcess(i, "arrival", Number(e.target.value))} />
                <label className="text-sm">Burst</label>
                <input className="w-20 rounded p-1 text-black" type="number" value={p.burst} onChange={(e) => updateProcess(i, "burst", Number(e.target.value))} />
                {algo === "priority" && (
                  <>
                    <label className="text-sm">Priority</label>
                    <input className="w-20 rounded p-1 text-black" type="number" value={p.priority ?? 1} onChange={(e) => updateProcess(i, "priority", Number(e.target.value))} />
                  </>
                )}
                <button className="ml-2 rounded bg-red-600 px-2 py-1 text-sm" onClick={() => removeProcess(i)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button className="rounded bg-green-600 px-3 py-1" onClick={addProcess}>Add Process</button>
            <button className="rounded bg-blue-600 px-3 py-1" onClick={run}>Run</button>
          </div>
        </div>

        {results && (
          <div className="mt-6">
            <h3 className="font-medium">Results</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left text-slate-300">
                    <th className="pr-4">ID</th>
                    <th className="pr-4">Arrival</th>
                    <th className="pr-4">Burst</th>
                    {algo === "priority" && <th className="pr-4">Priority</th>}
                    <th className="pr-4">Start</th>
                    <th className="pr-4">Finish</th>
                    <th className="pr-4">Waiting</th>
                    <th className="pr-4">Turnaround</th>
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
                <strong>Average Waiting Time:</strong> {averageWaiting.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
