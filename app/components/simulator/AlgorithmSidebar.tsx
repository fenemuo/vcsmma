"use client";

type CpuAlgo = "fcfs" | "sjf" | "rr" | "priority";

interface AlgorithmSidebarProps {
  algo: CpuAlgo;
  onSelect: (algo: CpuAlgo) => void;
}

const cpuAlgorithms: { value: CpuAlgo; label: string; hint: string }[] = [
  { value: "fcfs", label: "FCFS", hint: "First Come First Served" },
  { value: "sjf", label: "SJF", hint: "Shortest Job First" },
  { value: "rr", label: "Round Robin", hint: "Fixed time quantum" },
  { value: "priority", label: "Priority", hint: "Lowest number = highest priority" },
];

export function AlgorithmSidebar({ algo, onSelect }: AlgorithmSidebarProps) {
  return (
    <aside className="h-fit space-y-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 lg:sticky lg:top-20">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          CPU Scheduling
        </h2>
        <nav className="space-y-1">
          {cpuAlgorithms.map((item) => {
            const active = algo === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onSelect(item.value)}
                className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                  active
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                    : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="block text-xs text-slate-500">{item.hint}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4">
        <p className="text-xs text-slate-500">
          Looking for memory allocation?{" "}
          <a href="/learn/memory-management" className="text-indigo-400 hover:text-indigo-300 underline">
            Try it here
          </a>
          .
        </p>
      </div>
    </aside>
  );
}
