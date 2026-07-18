"use client";

import { useEffect, useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";

const memory = [100, 500, 200, 300, 600];

const REQUESTS = [120, 212, 450, 580, 50];


interface ExampleSimulationProps {
    algorithm: "first-fit" | "best-fit" | "worst-fit";
}

export default function ExampleSimulation({
    algorithm,
}: ExampleSimulationProps) {
    const [request, setRequest] = useState(REQUESTS[1]);
  const [current, setCurrent] = useState(-1);
const [selected, setSelected] = useState<number | null>(null);
const [finished, setFinished] = useState(false);

const resetSimulation = () => {
  setCurrent(-1);
  setSelected(null);
  setFinished(false);
};

useEffect(() => {
  resetSimulation();

  let index = 0;
  const candidates: number[] = [];

  const timer = setInterval(() => {
    if (index >= memory.length) {
      clearInterval(timer);

      let choice: number | null = null;

      if (algorithm === "best-fit") {
        if (candidates.length) {
          choice = candidates.reduce((best, cur) =>
            memory[cur] < memory[best] ? cur : best
          );
        }
      } else if (algorithm === "worst-fit") {
        if (candidates.length) {
          choice = candidates.reduce((worst, cur) =>
            memory[cur] > memory[worst] ? cur : worst
          );
        }
      }

      if (choice !== null) {
        setSelected(choice);
      }

      setFinished(true);
      return;
    }

    setCurrent(index);

    if (memory[index] >= request) {
      if (algorithm === "first-fit") {
        setSelected(index);
        setFinished(true);
        clearInterval(timer);
        return;
      }

      candidates.push(index);
    }

    index++;
  }, 900);

  return () => clearInterval(timer);
}, [request, algorithm]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold text-white">
        {
  algorithm === "first-fit"
    ? "First Fit Demonstration"
    : algorithm === "best-fit"
    ? "Best Fit Demonstration"
    : "Worst Fit Demonstration"
}
      </h2>

      <div className="mt-6 flex flex-wrap items-center gap-3">

  <span className="text-slate-300">
    Process Size:
  </span>

  {REQUESTS.map((value) => (
    <button
      key={value}
      onClick={() => setRequest(value)}
      className={`rounded-lg px-4 py-2 transition ${
        request === value
          ? "bg-blue-600 text-white"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {value} KB
    </button>
  ))}

</div>

      <p className="mt-3 text-slate-400">
        Process Request:
        <span className="ml-2 font-semibold text-blue-400">
          {request} KB
        </span>
      </p>

      {/* Memory Blocks */}

      <div className="mt-10 flex flex-wrap justify-center gap-6">

        {memory.map((block, index) => {
          const scanning = current === index;
          const rejected = current > index && selected === null;
          const allocated = selected === index;

          return (
            <div
              key={index}
              className={`
                relative
                h-32
                w-28
                rounded-2xl
                border-2
                transition-all
                duration-500
                flex
                flex-col
                items-center
                justify-center

                ${
                  allocated
                    ? "border-green-400 bg-green-600/20 scale-110"
                    : scanning
                    ? "border-yellow-400 bg-yellow-500/20 animate-pulse"
                    : rejected
                    ? "border-red-500 bg-red-500/20"
                    : "border-slate-700 bg-slate-800"
                }
              `}
            >
              <span className="text-xl font-bold text-white">
                {block}
              </span>

              <span className="text-sm text-slate-300">
                KB
              </span>

              {scanning && !allocated && (
                <Search
                  className="absolute -top-4 rounded-full bg-yellow-500 p-1 text-black"
                  size={28}
                />
              )}

              {allocated && (
                <CheckCircle2
                  className="absolute -top-4 rounded-full bg-green-500 text-white"
                  size={30}
                />
              )}

              {rejected && (
                <XCircle
                  className="absolute -top-4 rounded-full bg-red-500 text-white"
                  size={28}
                />
              )}
            </div>
          );
        })}

      </div>

      {/* Status */}

      <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-6">

        {!finished && (
          <div className="flex items-center gap-3 text-yellow-400">
            <Search className="animate-spin" />
            <span>
              Searching memory from the beginning...
            </span>
          </div>
        )}

        {finished && selected !== null && (
          <div className="space-y-4">

            <div className="flex items-center gap-3 text-green-400">

              <CheckCircle2 />

              <span className="font-semibold">

                {
  algorithm === "first-fit"
    ? "First Fit stops at the first suitable block."
    : algorithm === "best-fit"
    ? "Best Fit scans every block and selects the smallest suitable block."
    : "Worst Fit scans every block and selects the largest suitable block."
}

              </span>

            </div>

            <div className="rounded-xl bg-green-900/30 p-4">

              <p className="text-slate-300">

                Allocated Block:
                <strong className="ml-2 text-green-400">
                  {memory[selected]} KB
                </strong>

              </p>

              <p className="mt-2 text-slate-300">

                Process Size:
                <strong className="ml-2 text-blue-400">
                  {request} KB
                </strong>

              </p>

              <p className="mt-2 text-slate-300">

                Remaining Free Memory:
                <strong className="ml-2 text-yellow-400">
                  {memory[selected] - request} KB
                </strong>

              </p>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}