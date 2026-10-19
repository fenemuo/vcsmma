"use client";

import { useEffect, useState } from "react";
import { fifoPaging, type PageFrameResult } from "@/lib/algorithms/fifoPaging";
import { lruPaging } from "@/lib/algorithms/lruPaging";
import { optimalPaging } from "@/lib/algorithms/optimalPaging";
import { Field, ModuleHeader, breakdownLabel, breakdownRow, inputClass } from "./shared";

type ReplacementAlgo = "fifo" | "lru" | "optimal";

const ALGORITHMS: Record<ReplacementAlgo, { label: string; rule: string; run: typeof fifoPaging }> = {
  fifo: {
    label: "FIFO",
    rule: "On a fault with full frames, evict the page that was loaded earliest.",
    run: fifoPaging,
  },
  lru: {
    label: "LRU",
    rule: "On a fault with full frames, evict the page that was used least recently.",
    run: lruPaging,
  },
  optimal: {
    label: "Optimal",
    rule: "On a fault with full frames, evict the page that will not be used for the longest time.",
    run: optimalPaging,
  },
};

const ALGO_KEYS = Object.keys(ALGORITHMS) as ReplacementAlgo[];

const PRESETS = [
  { label: "Classic textbook string", value: "7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1" },
  { label: "Belady string", value: "1 2 3 4 1 2 5 1 2 3 4 5" },
];

const BELADY_STRING = PRESETS[1].value;

function parseReferenceString(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isInteger(n) && n >= 0);
}

function simulate(algo: ReplacementAlgo, reference: number[], frameCount: number) {
  return ALGORITHMS[algo].run(
    reference.map((id) => ({ id })),
    frameCount
  );
}

function countFaults(results: PageFrameResult[], upTo = results.length) {
  return results.slice(0, upTo).filter((r) => r.pageFault).length;
}

// The frame that changed on a fault, and the page it replaced (null when the frame was free).
function changedFrame(results: PageFrameResult[], step: number, frameCount: number) {
  if (!results[step].pageFault) return null;
  const prev = step > 0 ? results[step - 1].frameState : Array(frameCount).fill(null);
  const index = results[step].frameState.findIndex((page, i) => page !== prev[i]);
  return { index, evicted: prev[index] as number | null };
}

// Reveals simulation steps one at a time.
function usePlayback(stepMs: number) {
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const next = visible + 1;
      setVisible(next);
      if (next >= total) setPlaying(false);
    }, stepMs);
    return () => clearTimeout(timer);
  }, [playing, visible, total, stepMs]);

  return {
    visible,
    playing,
    start(count: number, animate: boolean) {
      setTotal(count);
      setVisible(animate ? 0 : count);
      setPlaying(animate);
    },
    pause: () => setPlaying(false),
    resume: () => setPlaying(visible < total),
    stepBy(delta: number) {
      setPlaying(false);
      setVisible(Math.min(total, Math.max(0, visible + delta)));
    },
    showAll() {
      setPlaying(false);
      setVisible(total);
    },
  };
}

export function PageReplacement() {
  return (
    <div className="space-y-10">
      <ReplacementSimulator />
      <BeladyDemo />
    </div>
  );
}

function ReplacementSimulator() {
  const [referenceText, setReferenceText] = useState(PRESETS[0].value);
  const [frameCount, setFrameCount] = useState(3);
  const [algo, setAlgo] = useState<ReplacementAlgo>("fifo");
  const [run, setRun] = useState<{ frameCount: number; results: Record<ReplacementAlgo, PageFrameResult[]> } | null>(null);
  const playback = usePlayback(450);

  const reference = parseReferenceString(referenceText);

  function simulateAll(animate: boolean) {
    const results = Object.fromEntries(ALGO_KEYS.map((key) => [key, simulate(key, reference, frameCount)])) as Record<
      ReplacementAlgo,
      PageFrameResult[]
    >;
    setRun({ frameCount, results });
    playback.start(reference.length, animate);
  }

  const shown = run?.results[algo];
  const done = shown ? playback.visible >= shown.length : false;

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Page Replacement"
        description="When a page is needed and every frame is full, the OS must evict one. Compare how FIFO, LRU and Optimal choose their victim on the same reference string."
      />

      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
        <Field label="Reference string" hint={`Page numbers separated by spaces or commas — ${reference.length} references.`}>
          <input
            className={`${inputClass} w-full font-mono`}
            value={referenceText}
            placeholder="e.g. 7 0 1 2 0 3"
            onChange={(e) => {
              setReferenceText(e.target.value);
              setRun(null);
            }}
          />
        </Field>
        <div className="flex flex-wrap gap-2 text-xs">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-300 hover:border-indigo-500 hover:text-indigo-300"
              onClick={() => {
                setReferenceText(preset.value);
                setRun(null);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Field label="Frames">
            <input
              className={`${inputClass} w-20`}
              type="number"
              min={1}
              max={10}
              value={frameCount}
              onChange={(e) => {
                setFrameCount(Math.min(10, Math.max(1, Number(e.target.value) || 1)));
                setRun(null);
              }}
            />
          </Field>
          <div className="ml-auto flex gap-2">
            <button type="button" className="rounded bg-blue-600 px-3 py-1 disabled:opacity-50" disabled={!reference.length} onClick={() => simulateAll(false)}>
              Run
            </button>
            <button type="button" className="rounded bg-indigo-600 px-3 py-1 disabled:opacity-50" disabled={!reference.length} onClick={() => simulateAll(true)}>
              Run step by step
            </button>
          </div>
        </div>
      </div>

      {run && shown && (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {ALGO_KEYS.map((key) => {
              const active = key === algo;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAlgo(key)}
                  className={`rounded-xl border p-4 text-left transition ${
                    active ? "border-indigo-500 bg-indigo-500/10" : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <div className={`text-xs uppercase tracking-wide ${active ? "text-indigo-300" : "text-slate-500"}`}>{ALGORITHMS[key].label}</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-100">
                    {countFaults(run.results[key], playback.visible)}
                    <span className="ml-1 text-sm font-normal text-slate-400">faults</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-medium">{ALGORITHMS[algo].label} with {run.frameCount} frames</h3>
                <p className="text-sm text-slate-400">{ALGORITHMS[algo].rule}</p>
              </div>
              <PlaybackControls playback={playback} done={done} />
            </div>
            <FrameTable results={shown} frameCount={run.frameCount} visible={playback.visible} />
            <p className="mt-2 text-xs text-slate-500">
              F = page fault, H = hit. Highlighted cells show the frame loaded on each fault.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-200">Step-by-step</h4>
            <ol className="max-h-80 space-y-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/60 p-4 font-mono text-sm">
              {shown.slice(0, playback.visible).map((r, step) => {
                const change = changedFrame(shown, step, run.frameCount);
                return (
                  <li key={step} className="flex flex-wrap gap-x-2 text-slate-300">
                    <span className="w-10 shrink-0 text-slate-500">#{step + 1}</span>
                    <span className="w-16 shrink-0">Page {r.requestId}</span>
                    {!change ? (
                      <span className="text-emerald-400">hit — already in a frame</span>
                    ) : change.evicted === null ? (
                      <span className="text-red-400">fault — loaded into free frame F{change.index + 1}</span>
                    ) : (
                      <span className="text-red-400">
                        fault — evicted page {change.evicted} from F{change.index + 1}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {done && (
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className={breakdownRow}>
                <span className={breakdownLabel}>Total faults</span>
                <span className="text-emerald-400">{countFaults(shown)}</span>
              </div>
              <div className={breakdownRow}>
                <span className={breakdownLabel}>Fault rate</span>
                <span className="text-slate-300">
                  faults / references = {countFaults(shown)} / {shown.length} ={" "}
                  <span className="text-emerald-400">{((countFaults(shown) / shown.length) * 100).toFixed(1)}%</span>
                </span>
              </div>
              <div className={breakdownRow}>
                <span className={breakdownLabel}>Hit ratio</span>
                <span className="text-slate-300">
                  hits / references = {shown.length - countFaults(shown)} / {shown.length} ={" "}
                  <span className="text-emerald-400">{(((shown.length - countFaults(shown)) / shown.length) * 100).toFixed(1)}%</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BeladyDemo() {
  const [referenceText, setReferenceText] = useState(BELADY_STRING);
  const [algo, setAlgo] = useState<ReplacementAlgo>("fifo");
  const [run, setRun] = useState<{ algo: ReplacementAlgo; small: PageFrameResult[]; large: PageFrameResult[] } | null>(null);
  const playback = usePlayback(500);

  const reference = parseReferenceString(referenceText);
  const done = run ? playback.visible >= run.small.length : false;

  function start() {
    setRun({ algo, small: simulate(algo, reference, 3), large: simulate(algo, reference, 4) });
    playback.start(reference.length, true);
  }

  const smallFaults = run ? countFaults(run.small, playback.visible) : 0;
  const largeFaults = run ? countFaults(run.large, playback.visible) : 0;

  return (
    <div className="space-y-6 border-t border-slate-800 pt-8">
      <ModuleHeader
        title="Belady's Anomaly"
        description="More frames should mean fewer faults, but not always with FIFO. Run the same string with 3 and then 4 frames and watch the totals."
      />

      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
        <div className="min-w-60 flex-1">
          <Field label="Reference string">
            <input
              className={`${inputClass} w-full font-mono`}
              value={referenceText}
              onChange={(e) => {
                setReferenceText(e.target.value);
                setRun(null);
              }}
            />
          </Field>
        </div>
        <Field label="Algorithm">
          <select
            className={inputClass}
            value={algo}
            onChange={(e) => {
              setAlgo(e.target.value as ReplacementAlgo);
              setRun(null);
            }}
          >
            {ALGO_KEYS.map((key) => (
              <option key={key} value={key}>
                {ALGORITHMS[key].label}
              </option>
            ))}
          </select>
        </Field>
        <button type="button" className="rounded bg-indigo-600 px-3 py-1.5 disabled:opacity-50" disabled={!reference.length} onClick={start}>
          {run ? "Replay" : "Run demo"}
        </button>
      </div>

      {run && (
        <div className="space-y-5">
          <div className="flex justify-end">
            <PlaybackControls playback={playback} done={done} />
          </div>
          {[
            { frames: 3, results: run.small, faults: smallFaults },
            { frames: 4, results: run.large, faults: largeFaults },
          ].map(({ frames, results, faults }) => (
            <div key={frames}>
              <div className="mb-2 flex items-baseline justify-between">
                <h4 className="text-sm font-medium text-slate-200">
                  {ALGORITHMS[run.algo].label} with {frames} frames
                </h4>
                <span className="text-sm text-slate-400">
                  Faults: <span className="text-xl font-semibold text-red-400">{faults}</span>
                </span>
              </div>
              <FrameTable results={results} frameCount={frames} visible={playback.visible} />
            </div>
          ))}

          {done && (
            <p
              className={`paging-step-in rounded-xl border p-4 text-sm ${
                largeFaults > smallFaults
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
              }`}
            >
              {largeFaults > smallFaults ? (
                <>
                  <strong>Belady&apos;s anomaly!</strong> Adding a frame increased the faults from {smallFaults} to {largeFaults}. FIFO evicts by
                  load order, so the set of pages held in 4 frames is not always a superset of the set held in 3.
                </>
              ) : (
                <>
                  <strong>No anomaly:</strong> {smallFaults} faults with 3 frames vs {largeFaults} with 4.{" "}
                  {run.algo === "fifo"
                    ? "FIFO only shows the anomaly on some strings. Try the Belady string."
                    : `${ALGORITHMS[run.algo].label} is a stack algorithm: the pages held in n frames are always a subset of those held in n + 1, so more frames can never cause more faults.`}
                </>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function PlaybackControls({ playback, done }: { playback: ReturnType<typeof usePlayback>; done: boolean }) {
  const button = "rounded bg-slate-700 px-2.5 py-1 text-sm hover:bg-slate-600 disabled:opacity-40";
  return (
    <div className="flex flex-wrap gap-1.5">
      <button type="button" className={button} disabled={playback.visible === 0} onClick={() => playback.stepBy(-1)}>
        ←
      </button>
      {playback.playing ? (
        <button type="button" className={button} onClick={playback.pause}>
          Pause
        </button>
      ) : (
        <button type="button" className={button} disabled={done} onClick={playback.resume}>
          Play
        </button>
      )}
      <button type="button" className={button} disabled={done} onClick={() => playback.stepBy(1)}>
        →
      </button>
      <button type="button" className={button} disabled={done} onClick={playback.showAll}>
        Show all
      </button>
    </div>
  );
}

function FrameTable({ results, frameCount, visible }: { results: PageFrameResult[]; frameCount: number; visible: number }) {
  const rowHeader = "sticky left-0 bg-slate-950 px-3 py-2 text-left font-sans text-xs font-medium uppercase tracking-wide text-slate-500";

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
      <table className="border-collapse text-center font-mono text-sm">
        <thead>
          <tr>
            <th className={rowHeader}>Ref</th>
            {results.map((r, step) => (
              <th
                key={step}
                className={`min-w-10 px-2 py-2 font-semibold ${
                  step === visible - 1 ? "text-indigo-300" : step < visible ? "text-slate-100" : "text-slate-600"
                }`}
              >
                {r.requestId}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: frameCount }, (_, frame) => (
            <tr key={frame} className="border-t border-slate-800">
              <th className={rowHeader}>F{frame + 1}</th>
              {results.map((r, step) => {
                if (step >= visible) return <td key={step} className="px-2 py-2" />;
                const changed = changedFrame(results, step, frameCount)?.index === frame;
                const page = r.frameState[frame];
                return (
                  <td
                    key={step}
                    className={`paging-step-in px-2 py-2 ${
                      changed ? "bg-red-500/20 font-semibold text-red-300" : page === null ? "text-slate-700" : "text-slate-300"
                    }`}
                  >
                    {page ?? "–"}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-t border-slate-800">
            <th className={rowHeader}>Result</th>
            {results.map((r, step) =>
              step >= visible ? (
                <td key={step} className="px-2 py-2" />
              ) : (
                <td
                  key={step}
                  className={`paging-step-in px-2 py-2 font-sans text-xs font-semibold ${r.pageFault ? "text-red-400" : "text-emerald-400"}`}
                >
                  {r.pageFault ? "F" : "H"}
                </td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
