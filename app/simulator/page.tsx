"use client";

import { useState } from "react";
import Link from "next/link";
import { fcfs } from "@/lib/algorithms/fcfs";
import { sjf } from "@/lib/algorithms/sjf";
import { roundRobin } from "@/lib/algorithms/roundRobin";
import { priorityScheduling } from "@/lib/algorithms/priority";
import { firstFit } from "@/lib/algorithms/firstFit";
import { bestFit } from "@/lib/algorithms/bestFit";
import { worstFit } from "@/lib/algorithms/worstFit";
import { GanttChart } from "@/app/components/gantt-chart/GanttChart";

interface Proc {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
}

interface MemoryBlock {
  id: string;
  size: number;
}

interface MemoryRequest {
  id: string;
  size: number;
}

type CpuAlgo = "fcfs" | "sjf" | "rr" | "priority";
type MemoryAlgo = "firstFit" | "bestFit" | "worstFit";
type Algo = CpuAlgo | MemoryAlgo;

type AlgoCategory = "cpu" | "memory";

export default function SimulatorPage() {
  const [algoCategory, setAlgoCategory] = useState<AlgoCategory>("cpu");
  const [algo, setAlgo] = useState<Algo>("fcfs");
  const [quantum, setQuantum] = useState(4);
  const [processes, setProcesses] = useState<Proc[]>([
    { id: "P1", arrival: 0, burst: 5, priority: 1 },
    { id: "P2", arrival: 1, burst: 3, priority: 2 },
    { id: "P3", arrival: 2, burst: 4, priority: 3 },
  ]);
  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>([
    { id: "B1", size: 10 },
    { id: "B2", size: 5 },
    { id: "B3", size: 20 },
  ]);
  const [memoryRequests, setMemoryRequests] = useState<MemoryRequest[]>([
    { id: "P1", size: 4 },
    { id: "P2", size: 8 },
    { id: "P3", size: 3 },
  ]);
  const [results, setResults] = useState<any[] | null>(null);

  function switchCategory(category: AlgoCategory) {
    setAlgoCategory(category);
    setAlgo(category === "cpu" ? "fcfs" : "firstFit");
    setResults(null);
  }

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
    setProcesses(processes.filter((_, i) => i !== index));
  }

  function updateMemoryBlock(index: number, value: string | number) {
    const next = [...memoryBlocks];
    next[index] = {
      ...next[index],
      size: Number(value),
    };
    setMemoryBlocks(next);
  }

  function addMemoryBlock() {
    const nextId = `B${memoryBlocks.length + 1}`;
    setMemoryBlocks([...memoryBlocks, { id: nextId, size: 5 }]);
  }

  function removeMemoryBlock(index: number) {
    setMemoryBlocks(memoryBlocks.filter((_, i) => i !== index));
  }

  function updateMemoryRequest(index: number, value: string | number) {
    const next = [...memoryRequests];
    next[index] = {
      ...next[index],
      size: Number(value),
    };
    setMemoryRequests(next);
  }

  function addMemoryRequest() {
    const nextId = `P${memoryRequests.length + 1}`;
    setMemoryRequests([...memoryRequests, { id: nextId, size: 1 }]);
  }

  function removeMemoryRequest(index: number) {
    setMemoryRequests(memoryRequests.filter((_, i) => i !== index));
  }

  function run() {
    let res: any[] = [];

    if (algoCategory === "cpu") {
      if (algo === "fcfs") {
        res = fcfs(processes as any);
      } else if (algo === "sjf") {
        res = sjf(processes as any);
      } else if (algo === "rr") {
        res = roundRobin(processes as any, quantum);
      } else if (algo === "priority") {
        res = priorityScheduling(processes as any);
      }
    } else {
      if (algo === "firstFit") {
        res = firstFit(memoryBlocks, memoryRequests);
      } else if (algo === "bestFit") {
        res = bestFit(memoryBlocks, memoryRequests);
      } else if (algo === "worstFit") {
        res = worstFit(memoryBlocks, memoryRequests);
      }
    }

    setResults(res);
  }

  const averageWaiting = algoCategory === "cpu" && results && results.length
    ? results.reduce((s, r) => s + (r.waiting ?? 0), 0) / results.length
    : 0;

  const allocatedCount = algoCategory === "memory" && results
    ? results.filter((r) => r.blockId !== null).length
    : 0;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section className="space-y-4 rounded-2xl border bg-slate-900 p-6 text-slate-100">
        <h1 className="text-xl font-semibold">Simulators — CPU Scheduling & Memory Allocation</h1>

        <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="font-medium">Simulator Type</h2>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={algoCategory === "cpu"}
                onChange={() => switchCategory("cpu")}
              />
              CPU Scheduling
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={algoCategory === "memory"}
                onChange={() => switchCategory("memory")}
              />
              Memory Allocation
            </label>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <h2 className="font-medium">Algorithm</h2>
            {algoCategory === "cpu" ? (
              <div className="grid gap-2 sm:grid-cols-2">
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
            ) : (
              <div className="grid gap-2 sm:grid-cols-3">
                <label className="flex items-center gap-2">
                  <input type="radio" checked={algo === "firstFit"} onChange={() => setAlgo("firstFit")} /> First Fit
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" checked={algo === "bestFit"} onChange={() => setAlgo("bestFit")} /> Best Fit
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" checked={algo === "worstFit"} onChange={() => setAlgo("worstFit")} /> Worst Fit
                </label>
              </div>
            )}

            {algoCategory === "cpu" && algo === "rr" && (
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
          </div>
        </div>

        {algoCategory === "cpu" ? (
          <div className="mt-4">
            <h2 className="font-medium">Processes</h2>
            <div className="mt-2 space-y-2">
              {processes.map((p, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
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
                  <button className="ml-auto rounded bg-red-600 px-2 py-1 text-sm" onClick={() => removeProcess(i)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded bg-green-600 px-3 py-1" onClick={addProcess}>Add Process</button>
              <button className="rounded bg-blue-600 px-3 py-1" onClick={run}>Run</button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            <div>
              <h2 className="font-medium">Memory Blocks</h2>
              <div className="mt-2 space-y-2">
                {memoryBlocks.map((block, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2">
                    <input className="w-24 rounded p-1 text-black" value={block.id} readOnly />
                    <label className="text-sm">Size</label>
                    <input className="w-24 rounded p-1 text-black" type="number" value={block.size} onChange={(e) => updateMemoryBlock(i, Number(e.target.value))} />
                    <button className="ml-auto rounded bg-red-600 px-2 py-1 text-sm" onClick={() => removeMemoryBlock(i)}>Remove</button>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="rounded bg-green-600 px-3 py-1" onClick={addMemoryBlock}>Add Block</button>
                <button className="rounded bg-blue-600 px-3 py-1" onClick={run}>Run</button>
              </div>
            </div>

            <div>
              <h2 className="font-medium">Memory Requests</h2>
              <div className="mt-2 space-y-2">
                {memoryRequests.map((request, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2">
                    <input className="w-24 rounded p-1 text-black" value={request.id} readOnly />
                    <label className="text-sm">Size</label>
                    <input className="w-24 rounded p-1 text-black" type="number" value={request.size} onChange={(e) => updateMemoryRequest(i, Number(e.target.value))} />
                    <button className="ml-auto rounded bg-red-600 px-2 py-1 text-sm" onClick={() => removeMemoryRequest(i)}>Remove</button>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="rounded bg-green-600 px-3 py-1" onClick={addMemoryRequest}>Add Request</button>
                <button className="rounded bg-blue-600 px-3 py-1" onClick={run}>Run</button>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Results</h3>
              <Link
                href={algoCategory === "cpu" ? "/learn#cpu-scheduling-breakdown" : "/learn#memory-management"}
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Learn how calculations work →
              </Link>
            </div>

            {algoCategory === "cpu" ? (
              <>
                <div className="mt-4 mb-6">
                  <h4 className="text-sm font-medium mb-3">Gantt Chart</h4>
                  <GanttChart
                    tasks={results.map((r) => ({
                      id: r.id,
                      start: algo === "rr" ? r.startTimes : r.start,
                      finish: r.finish,
                      arrival: r.arrival,
                    }))}
                    maxTime={Math.max(...results.map((r) => r.finish))}
                  />
                </div>

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
              </>
            ) : (
              <div className="mt-2 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr className="text-left text-slate-300">
                      <th className="pr-4">Process</th>
                      <th className="pr-4">Requested Size</th>
                      <th className="pr-4">Block Assigned</th>
                      <th className="pr-4">Allocated Size</th>
                      <th className="pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, idx) => (
                      <tr key={idx} className="border-t border-slate-800">
                        <td className="py-2">{r.processId}</td>
                        <td>{memoryRequests[idx]?.size ?? "-"}</td>
                        <td>{r.blockId ?? "Unallocated"}</td>
                        <td>{r.allocatedSize}</td>
                        <td>{r.blockId ? "Allocated" : "Failed"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 text-sm text-slate-200">
                  <p><strong>Allocated requests:</strong> {allocatedCount}/{results.length}</p>
                  <p><strong>Algorithm:</strong> {algo === "firstFit" ? "First Fit" : algo === "bestFit" ? "Best Fit" : "Worst Fit"}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
