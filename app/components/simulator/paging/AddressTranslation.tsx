"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { translateAddress } from "@/lib/algorithms/addressTranslation";
import { celebrate } from "@/lib/confetti";
import { Field, ModuleHeader, Stat, inputClass } from "./shared";

const PAGE_SIZES = [256, 512, 1024, 2048, 4096];
const STEP_MS = 1400;
const MAX_PAGES = 8;
const MAX_FRAMES = 16;

type Mode = "explore" | "practice";

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomPageTable(pageCount: number, frameCount: number): (number | null)[] {
  const frames = Array.from({ length: frameCount }, (_, i) => i).sort(() => Math.random() - 0.5);
  const table: (number | null)[] = Array.from({ length: pageCount }, (_, i) => frames[i] ?? null);
  // Leave one page out of memory so page faults show up too.
  if (pageCount > 2) table[randomInt(pageCount)] = null;
  return table;
}

// Mostly addresses on resident pages, with an occasional page fault to spot.
function randomQuestion(pageTable: (number | null)[], pageSize: number) {
  const resident = pageTable.flatMap((f, page) => (f === null ? [] : [page]));
  const missing = pageTable.flatMap((f, page) => (f === null ? [page] : []));
  const askFault = missing.length > 0 && (resident.length === 0 || Math.random() < 0.2);
  const pool = askFault ? missing : resident;
  const page = pool[randomInt(pool.length)] ?? 0;
  return page * pageSize + randomInt(pageSize);
}

export function AddressTranslation() {
  const [pageSize, setPageSize] = useState(1024);
  const [frameCount, setFrameCount] = useState(8);
  const [pageTable, setPageTable] = useState<(number | null)[]>([5, 2, 7, null]);
  const [logicalAddress, setLogicalAddress] = useState(2900);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [mode, setMode] = useState<Mode>("explore");
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [verdict, setVerdict] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, attempted: 0, streak: 0 });

  const address = mode === "practice" ? question : logicalAddress;
  const result = translateAddress(address, pageSize, pageTable);
  const { pageNumber, offset, frame } = result;

  // Steps: 1 split the address, 2 look up the page table, 3 read the frame, 4 build the physical address.
  const lastStep = result.error === "out-of-range" ? 2 : result.error === "page-fault" ? 3 : 4;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const next = step + 1;
      setStep(next);
      if (next >= lastStep) setPlaying(false);
    }, step === 0 ? 150 : STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, step, lastStep]);

  function resetAnimation() {
    setStep(0);
    setPlaying(false);
  }

  function play() {
    setStep(0);
    setPlaying(true);
  }

  function updatePageCount(count: number) {
    const next = Math.min(MAX_PAGES, Math.max(1, count || 1));
    setPageTable(Array.from({ length: next }, (_, i) => pageTable[i] ?? null));
    resetAnimation();
  }

  function updateFrameCount(count: number) {
    const next = Math.min(MAX_FRAMES, Math.max(1, count || 1));
    setFrameCount(next);
    setPageTable(pageTable.map((f) => (f !== null && f < next ? f : null)));
    resetAnimation();
  }

  function updateEntry(page: number, value: string) {
    const next = [...pageTable];
    next[page] = value === "" ? null : Number(value);
    setPageTable(next);
    resetAnimation();
  }

  function newQuestion(table = pageTable) {
    setQuestion(randomQuestion(table, pageSize));
    setAnswer("");
    setVerdict(null);
    resetAnimation();
  }

  function randomizeTable() {
    const table = randomPageTable(pageTable.length, frameCount);
    setPageTable(table);
    if (mode === "practice") newQuestion(table);
    else resetAnimation();
  }

  function switchMode(next: Mode) {
    setMode(next);
    if (next === "practice") newQuestion();
    else resetAnimation();
  }

  function check(given: number | "fault") {
    const correct =
      given === "fault" ? result.error === "page-fault" : result.error === null && given === result.physicalAddress;
    const streak = correct ? score.streak + 1 : 0;
    setScore({ correct: score.correct + (correct ? 1 : 0), attempted: score.attempted + 1, streak });
    setVerdict(correct);
    if (correct && streak % 5 === 0) celebrate();
    play();
  }

  const pageBits = Math.max(1, Math.ceil(Math.log2(pageTable.length)));
  const offsetBits = Math.log2(pageSize);
  const binary = address.toString(2).padStart(pageBits + offsetBits, "0");
  const answered = mode === "explore" || verdict !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ModuleHeader
          title="Address Translation"
          description="Split a logical address into page number and offset, look the page up in the page table, and build the physical address from the frame."
        />
        <div className="flex rounded-lg border border-slate-700 p-0.5 text-sm">
          {(["explore", "practice"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`rounded-md px-3 py-1 ${mode === m ? "bg-indigo-600 text-white" : "text-slate-300 hover:text-white"}`}
            >
              {m === "explore" ? "Explore" : "Check your answer"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Page size (bytes)">
          <select
            className={inputClass}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              if (mode === "practice") setVerdict(null);
              resetAnimation();
            }}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Pages in process" hint={`1–${MAX_PAGES}`}>
          <input
            className={inputClass}
            type="number"
            min={1}
            max={MAX_PAGES}
            value={pageTable.length}
            disabled={mode === "practice"}
            onChange={(e) => updatePageCount(Number(e.target.value))}
          />
        </Field>
        <Field label="Physical frames" hint={`1–${MAX_FRAMES}`}>
          <input
            className={inputClass}
            type="number"
            min={1}
            max={MAX_FRAMES}
            value={frameCount}
            disabled={mode === "practice"}
            onChange={(e) => updateFrameCount(Number(e.target.value))}
          />
        </Field>
        {mode === "explore" ? (
          <Field label="Logical address" hint={`Valid range 0–${pageTable.length * pageSize - 1}`}>
            <input
              className={`${inputClass} font-mono`}
              type="number"
              min={0}
              value={logicalAddress}
              onChange={(e) => {
                setLogicalAddress(Math.max(0, Math.floor(Number(e.target.value)) || 0));
                resetAnimation();
              }}
            />
          </Field>
        ) : (
          <div className="flex items-end">
            <button type="button" className="rounded bg-slate-700 px-3 py-1.5 text-sm hover:bg-slate-600" onClick={() => newQuestion()}>
              New question
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-4">
          {mode === "explore" && (
            <>
              <button type="button" className="rounded bg-blue-600 px-3 py-1" onClick={play}>
                {step > 0 ? "Replay" : "Translate"}
              </button>
              <button
                type="button"
                className="rounded bg-slate-700 px-3 py-1 disabled:opacity-40"
                disabled={step === 0}
                onClick={() => {
                  setPlaying(false);
                  setStep(step - 1);
                }}
              >
                ← Back
              </button>
              <button
                type="button"
                className="rounded bg-slate-700 px-3 py-1 disabled:opacity-40"
                disabled={step >= lastStep}
                onClick={() => {
                  setPlaying(false);
                  setStep(step + 1);
                }}
              >
                Next step →
              </button>
            </>
          )}
          <button type="button" className="ml-auto rounded bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600" onClick={randomizeTable}>
            Randomize page table
          </button>
        </div>
      </div>

      {mode === "practice" && (
        <div className="space-y-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Score" value={`${score.correct}/${score.attempted}`} />
            <Stat label="Streak" value={score.streak} tone="text-emerald-400" />
            <Stat label="Page size" value={`${pageSize} B`} tone="text-indigo-300" />
          </div>
          <p className="text-base">
            Translate logical address <span className="font-mono text-lg font-semibold text-indigo-300">{question}</span>{" "}
            using the page table below.
          </p>
          <form
            className="flex flex-wrap items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (answer.trim() !== "" && verdict === null) check(Number(answer));
            }}
          >
            <input
              className={`${inputClass} w-40 font-mono`}
              type="number"
              min={0}
              placeholder="Physical address"
              value={answer}
              disabled={verdict !== null}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className="rounded bg-blue-600 px-3 py-1 disabled:opacity-40" disabled={verdict !== null || answer.trim() === ""}>
              Check
            </button>
            <button
              type="button"
              className="rounded border border-red-500/50 px-3 py-1 text-red-300 hover:bg-red-500/10 disabled:opacity-40"
              disabled={verdict !== null}
              onClick={() => check("fault")}
            >
              It&apos;s a page fault
            </button>
            {verdict !== null && (
              <button type="button" className="rounded bg-green-600 px-3 py-1" onClick={() => newQuestion()}>
                Next question →
              </button>
            )}
          </form>
          {verdict !== null && (
            <p
              className={`rounded-xl border p-3 text-sm ${
                verdict ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200" : "border-rose-500/40 bg-rose-500/10 text-rose-200"
              }`}
            >
              {verdict ? "Correct! " : "Not quite. "}
              {result.error === "page-fault"
                ? `Page ${pageNumber} has no frame in the page table, so this access causes a page fault.`
                : `Page ${pageNumber}, offset ${offset} → frame ${frame} → ${frame} × ${pageSize} + ${offset} = ${result.physicalAddress}.`}{" "}
              Watch the walkthrough below.
            </p>
          )}
        </div>
      )}

      <TranslationDiagram
        pageSize={pageSize}
        frameCount={frameCount}
        pageTable={pageTable}
        editable={mode === "explore"}
        onEntryChange={updateEntry}
        step={step}
        pageNumber={pageNumber}
        offset={offset}
        frame={frame}
        outOfRange={result.error === "out-of-range"}
      />

      {answered && step > 0 && (
        <ol className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
          <StepLine n={1} step={step}>
            <div>
              Split the address: page = ⌊{address} / {pageSize}⌋ = <span className="text-indigo-300">{pageNumber}</span>, offset = {address} mod{" "}
              {pageSize} = <span className="text-amber-300">{offset}</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              In binary the low {offsetBits} bits are the offset:{" "}
              <span className="text-indigo-300">{binary.slice(0, binary.length - offsetBits)}</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-300">{binary.slice(-offsetBits)}</span>
            </div>
          </StepLine>
          <StepLine n={2} step={step} error={result.error === "out-of-range"}>
            {result.error === "out-of-range"
              ? `Page ${pageNumber} is beyond the page table (pages 0–${pageTable.length - 1}), so the hardware traps with an addressing error.`
              : `Look up entry ${pageNumber} in the page table.`}
          </StepLine>
          <StepLine n={3} step={step} error={result.error === "page-fault"}>
            {result.error === "page-fault"
              ? `Entry ${pageNumber} is invalid: the page is not in memory, so this is a page fault. The OS loads it into a frame and retries.`
              : `Entry ${pageNumber} says the page is in frame ${frame}.`}
          </StepLine>
          <StepLine n={4} step={step}>
            Physical address = frame × page size + offset = {frame} × {pageSize} + {offset} ={" "}
            <span className="font-semibold text-emerald-400">{result.physicalAddress}</span>
          </StepLine>
        </ol>
      )}
    </div>
  );
}

function StepLine({ n, step, error, children }: { n: number; step: number; error?: boolean; children: React.ReactNode }) {
  if (step < n) return null;
  return (
    <li className={`paging-step-in flex gap-3 font-mono ${step === n ? "text-slate-100" : "text-slate-400"}`}>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-sans text-xs font-semibold ${
          error ? "bg-red-500/20 text-red-300" : step === n ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"
        }`}
      >
        {n}
      </span>
      <div className={error ? "text-red-300" : undefined}>{children}</div>
    </li>
  );
}

interface DiagramProps {
  pageSize: number;
  frameCount: number;
  pageTable: (number | null)[];
  editable: boolean;
  onEntryChange: (page: number, value: string) => void;
  step: number;
  pageNumber: number;
  offset: number;
  frame: number | null;
  outOfRange: boolean;
}

function TranslationDiagram({
  pageSize,
  frameCount,
  pageTable,
  editable,
  onEntryChange,
  step,
  pageNumber,
  offset,
  frame,
  outOfRange,
}: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [arrows, setArrows] = useState<{ id: string; d: string }[]>([]);

  const showPageArrow = step >= 2 && !outOfRange;
  const showFrameArrow = step >= 3 && frame !== null;

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const box = container.getBoundingClientRect();
      const next: { id: string; d: string }[] = [];
      const link = (id: string, from: HTMLElement | null | undefined, to: HTMLElement | null | undefined) => {
        if (!from || !to) return;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const x1 = a.right - box.left + 2;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left - box.left - 8;
        const y2 = b.top + b.height / 2 - box.top;
        const mid = (x1 + x2) / 2;
        next.push({ id, d: `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}` });
      };
      if (showPageArrow) link("page", pageRefs.current[pageNumber], rowRefs.current[pageNumber]);
      if (showFrameArrow) link("frame", rowRefs.current[pageNumber], frameRefs.current[frame!]);
      setArrows(next);
    }

    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [showPageArrow, showFrameArrow, pageNumber, frame, pageTable.length, frameCount, pageSize]);

  const offsetRatio = offset / pageSize;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div ref={containerRef} className="relative grid min-w-[680px] grid-cols-[1fr_0.8fr_1fr] gap-x-16">
        <div>
          <ColumnTitle title="Logical memory" subtitle="process pages" />
          <div className="space-y-2">
            {pageTable.map((_, page) => {
              const active = step >= 1 && page === pageNumber;
              return (
                <div
                  key={page}
                  ref={(el) => {
                    pageRefs.current[page] = el;
                  }}
                  className={`relative overflow-hidden rounded-lg border px-3 py-2 transition ${
                    active ? "border-indigo-400 bg-indigo-500/15" : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">Page {page}</span>
                    <span className="font-mono text-xs text-slate-500">
                      {page * pageSize}–{(page + 1) * pageSize - 1}
                    </span>
                  </div>
                  {active && <OffsetMarker ratio={offsetRatio} offset={offset} />}
                </div>
              );
            })}
            {step >= 1 && outOfRange && (
              <div className="rounded-lg border border-dashed border-red-500/60 px-3 py-2 text-sm text-red-300">
                Page {pageNumber} — not part of this process
              </div>
            )}
          </div>
        </div>

        <div>
          <ColumnTitle title="Page table" subtitle="page → frame" />
          <div className="overflow-hidden rounded-lg border border-slate-800">
            <div className="grid grid-cols-2 bg-slate-900 px-3 py-1.5 text-xs uppercase tracking-wide text-slate-500">
              <span>Page</span>
              <span>Frame</span>
            </div>
            {pageTable.map((entry, page) => {
              const active = step >= 2 && page === pageNumber;
              const fault = active && entry === null && step >= 3;
              return (
                <div
                  key={page}
                  ref={(el) => {
                    rowRefs.current[page] = el;
                  }}
                  className={`grid grid-cols-2 items-center border-t border-slate-800 px-3 py-1.5 font-mono text-sm transition ${
                    fault ? "bg-red-500/15" : active ? "bg-indigo-500/15" : ""
                  }`}
                >
                  <span className={active ? "text-indigo-300" : "text-slate-300"}>{page}</span>
                  {editable ? (
                    <select
                      aria-label={`Frame for page ${page}`}
                      className={`${inputClass} py-0.5 text-sm`}
                      value={entry ?? ""}
                      onChange={(e) => onEntryChange(page, e.target.value)}
                    >
                      <option value="">— (invalid)</option>
                      {Array.from({ length: frameCount }, (_, f) => (
                        <option key={f} value={f} disabled={f !== entry && pageTable.includes(f)}>
                          {f}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className={entry === null ? "text-slate-600" : step >= 3 && active ? "text-emerald-300" : "text-slate-300"}>
                      {entry ?? "— invalid"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <ColumnTitle title="Physical memory" subtitle="frames in RAM" />
          <div className="space-y-2">
            {Array.from({ length: frameCount }, (_, f) => {
              const owner = pageTable.indexOf(f);
              const active = step >= 3 && f === frame;
              return (
                <div
                  key={f}
                  ref={(el) => {
                    frameRefs.current[f] = el;
                  }}
                  className={`relative overflow-hidden rounded-lg border px-3 py-2 transition ${
                    active ? "border-emerald-400 bg-emerald-500/15" : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">
                      Frame {f}
                      {owner >= 0 && <span className="ml-2 text-xs font-normal text-slate-400">holds page {owner}</span>}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {f * pageSize}–{(f + 1) * pageSize - 1}
                    </span>
                  </div>
                  {active && step >= 4 && <OffsetMarker ratio={offsetRatio} offset={offset} />}
                </div>
              );
            })}
          </div>
        </div>

        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <marker id="paging-arrowhead" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
            </marker>
          </defs>
          {arrows.map((arrow) => (
            <path
              key={`${arrow.id}-${arrow.d}`}
              d={arrow.d}
              pathLength={1}
              className="paging-arrow"
              fill="none"
              stroke="#818cf8"
              strokeWidth={2}
              markerEnd="url(#paging-arrowhead)"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function ColumnTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-3">
      <div className="text-sm font-semibold text-slate-200">{title}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </div>
  );
}

// A tick at the offset's position inside a page or frame, showing the offset is carried over unchanged.
function OffsetMarker({ ratio, offset }: { ratio: number; offset: number }) {
  return (
    <div className="paging-step-in mt-1.5 h-1.5 rounded-full bg-slate-800">
      <div className="relative h-full rounded-full bg-amber-400/30" style={{ width: `${Math.max(ratio * 100, 1)}%` }}>
        <span className="absolute -top-0.5 right-0 h-2.5 w-0.5 rounded bg-amber-300" title={`offset ${offset}`} />
      </div>
    </div>
  );
}
