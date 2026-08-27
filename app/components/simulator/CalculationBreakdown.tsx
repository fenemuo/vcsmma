interface CpuResult {
  id: string;
  arrival: number;
  burst: number;
  start?: number;
  startTimes?: number[];
  finish: number;
  waiting: number;
  turnaround: number;
}

interface CpuBreakdownProps {
  results: CpuResult[];
}

const row = "flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm";
const label = "min-w-[7.5rem] shrink-0 font-sans text-xs uppercase tracking-wide text-slate-500";

export function CpuCalculationBreakdown({ results }: CpuBreakdownProps) {
  if (!results.length) return null;

  const totalWaiting = results.reduce((s, r) => s + r.waiting, 0);
  const totalTurnaround = results.reduce((s, r) => s + r.turnaround, 0);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-slate-200">Calculation Breakdown</h4>

      <div className="grid gap-3 md:grid-cols-2">
        {results.map((r) => (
          <div
            key={r.id}
            className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          >
            <div className="text-sm font-semibold text-indigo-300">{r.id}</div>

            {typeof r.start === "number" && (
              <div className={row}>
                <span className={label}>Completion</span>
                <span className="text-slate-300">
                  CT = Start + Burst = {r.start} + {r.burst} ={" "}
                  <span className="text-emerald-400">{r.finish} ms</span>
                </span>
              </div>
            )}

            {r.startTimes && (
              <div className={row}>
                <span className={label}>Run slices</span>
                <span className="text-slate-300">
                  Started at [{r.startTimes.join(", ")}] ms, last slice ends at{" "}
                  <span className="text-emerald-400">{r.finish} ms</span>
                </span>
              </div>
            )}

            <div className={row}>
              <span className={label}>Turnaround</span>
              <span className="text-slate-300">
                TAT = CT − Arrival = {r.finish} − {r.arrival} ={" "}
                <span className="text-emerald-400">{r.turnaround} ms</span>
              </span>
            </div>

            <div className={row}>
              <span className={label}>Waiting</span>
              <span className="text-slate-300">
                WT = TAT − Burst = {r.turnaround} − {r.burst} ={" "}
                <span className="text-emerald-400">{r.waiting} ms</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-sm">
        <div className="mb-1 font-sans text-xs uppercase tracking-wide text-slate-500">
          Average Waiting Time
        </div>
        <div className="text-slate-300">
          Avg WT = ({results.map((r) => r.waiting).join(" + ")}) / {results.length} ={" "}
          {totalWaiting} / {results.length} ={" "}
          <span className="text-emerald-400">{(totalWaiting / results.length).toFixed(2)} ms</span>
        </div>
        <div className="mt-3 mb-1 font-sans text-xs uppercase tracking-wide text-slate-500">
          Average Turnaround Time
        </div>
        <div className="text-slate-300">
          Avg TAT = ({results.map((r) => r.turnaround).join(" + ")}) / {results.length} ={" "}
          {totalTurnaround} / {results.length} ={" "}
          <span className="text-emerald-400">
            {(totalTurnaround / results.length).toFixed(2)} ms
          </span>
        </div>
      </div>
    </div>
  );
}

