"use client";

import { useState } from "react";
import { pageTableSize } from "@/lib/algorithms/pageTableSize";
import { Field, ModuleHeader, Stat, breakdownLabel, breakdownRow, formatBytes, inputClass } from "./shared";

const PAGE_SIZES = [512, 1024, 2048, 4096, 8192, 16384, 65536, 2 * 1024 * 1024];
const ENTRY_SIZES = [2, 4, 8];
const SIZE_UNITS = { KB: 1024, MB: 1024 * 1024 } as const;

type SizeUnit = keyof typeof SIZE_UNITS;

function formatCount(n: number) {
  return n <= Number.MAX_SAFE_INTEGER ? n.toLocaleString() : `2^${Math.log2(n)}`;
}

export function PageTableSize() {
  const [addressBits, setAddressBits] = useState(32);
  const [pageSize, setPageSize] = useState(4096);
  const [entrySize, setEntrySize] = useState(4);
  const [processAmount, setProcessAmount] = useState(64);
  const [processUnit, setProcessUnit] = useState<SizeUnit>("KB");
  const [processCount, setProcessCount] = useState(100);

  const processSize = processAmount * SIZE_UNITS[processUnit];
  const r = pageTableSize(addressBits, pageSize, entrySize, processSize);
  const invalid = r.offsetBits > addressBits;
  const ratio = r.tableBytes / processSize;
  const unusedPercent = (1 - Math.min(r.processPages, r.pageCount) / r.pageCount) * 100;
  const largest = Math.max(r.tableBytes, processSize);

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Page Table Size"
        description="A single-level page table needs one entry for every page in the address space, whether the process uses it or not. See how big that gets."
      />

      <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Logical address bits" hint="e.g. 32 or 48">
          <input
            className={inputClass}
            type="number"
            min={8}
            max={64}
            value={addressBits}
            onChange={(e) => setAddressBits(Math.min(64, Math.max(8, Math.floor(Number(e.target.value)) || 8)))}
          />
        </Field>
        <Field label="Page size">
          <select className={inputClass} value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {formatBytes(size)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Page table entry size">
          <select className={inputClass} value={entrySize} onChange={(e) => setEntrySize(Number(e.target.value))}>
            {ENTRY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size} bytes
              </option>
            ))}
          </select>
        </Field>
        <Field label="Actual process size">
          <div className="flex gap-2">
            <input
              className={`${inputClass} w-full`}
              type="number"
              min={1}
              value={processAmount}
              onChange={(e) => setProcessAmount(Math.max(1, Number(e.target.value) || 1))}
            />
            <select className={inputClass} value={processUnit} onChange={(e) => setProcessUnit(e.target.value as SizeUnit)}>
              {Object.keys(SIZE_UNITS).map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="Running processes" hint="each one has its own page table">
          <input
            className={inputClass}
            type="number"
            min={1}
            value={processCount}
            onChange={(e) => setProcessCount(Math.max(1, Math.floor(Number(e.target.value)) || 1))}
          />
        </Field>
      </div>

      {invalid ? (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          A {formatBytes(pageSize)} page needs {r.offsetBits} offset bits, more than the {addressBits}-bit address has.
        </p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Pages in address space" value={formatCount(r.pageCount)} tone="text-indigo-300" />
            <Stat label="Page table per process" value={formatBytes(r.tableBytes)} tone="text-red-400" />
            <Stat label={`Tables for ${processCount} processes`} value={formatBytes(r.tableBytes * processCount)} tone="text-amber-300" />
          </div>

          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h4 className="mb-2 text-sm font-medium text-slate-200">Calculation Breakdown</h4>
            <div className={breakdownRow}>
              <span className={breakdownLabel}>Offset bits</span>
              <span className="text-slate-300">
                log₂(page size) = log₂({pageSize.toLocaleString()}) = <span className="text-emerald-400">{r.offsetBits}</span>
              </span>
            </div>
            <div className={breakdownRow}>
              <span className={breakdownLabel}>Page number bits</span>
              <span className="text-slate-300">
                address bits − offset bits = {addressBits} − {r.offsetBits} = <span className="text-emerald-400">{r.pageNumberBits}</span>
              </span>
            </div>
            <div className={breakdownRow}>
              <span className={breakdownLabel}>Number of pages</span>
              <span className="text-slate-300">
                2^{r.pageNumberBits} = <span className="text-emerald-400">{formatCount(r.pageCount)}</span>
              </span>
            </div>
            <div className={breakdownRow}>
              <span className={breakdownLabel}>Table size</span>
              <span className="text-slate-300">
                pages × entry size = {formatCount(r.pageCount)} × {entrySize} B ={" "}
                <span className="text-emerald-400">{formatBytes(r.tableBytes)}</span>
              </span>
            </div>
            <div className={breakdownRow}>
              <span className={breakdownLabel}>Pages actually used</span>
              <span className="text-slate-300">
                ⌈{formatBytes(processSize)} / {formatBytes(pageSize)}⌉ = <span className="text-emerald-400">{r.processPages.toLocaleString()}</span>{" "}
                entries ({formatBytes(r.usedTableBytes)})
              </span>
            </div>
            <div className={breakdownRow}>
              <span className={breakdownLabel}>All processes</span>
              <span className="text-slate-300">
                {processCount} × {formatBytes(r.tableBytes)} = <span className="text-emerald-400">{formatBytes(r.tableBytes * processCount)}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h4 className="text-sm font-medium text-slate-200">Page table vs. the process it describes</h4>
            <SizeBar label="Page table" bytes={r.tableBytes} max={largest} color="bg-red-400" />
            <SizeBar label="Process" bytes={processSize} max={largest} color="bg-indigo-400" />
            <p className="text-sm text-slate-300">
              {ratio >= 1 ? (
                <>
                  The page table is <span className="font-semibold text-red-300">{Number(ratio.toFixed(1)).toLocaleString()}×</span> the size of the
                  process itself, and {Number(unusedPercent.toFixed(4))}% of its entries are never used.
                </>
              ) : (
                <>
                  The page table is {Number((ratio * 100).toFixed(2))}% of the process size, and {Number(unusedPercent.toFixed(4))}% of its entries are
                  never used.
                </>
              )}{" "}
              This is why real systems use multi-level (hierarchical), hashed or inverted page tables, which only store entries for pages that exist.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function SizeBar({ label, bytes, max, color }: { label: string; bytes: number; max: number; color: string }) {
  return (
    <div className="grid grid-cols-[6rem_1fr_6rem] items-center gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <div className="h-3 rounded-r bg-slate-800/60">
        <div className={`h-full rounded-r ${color}`} style={{ width: `${(bytes / max) * 100}%`, minWidth: 2 }} />
      </div>
      <span className="text-right font-mono text-slate-200">{formatBytes(bytes)}</span>
    </div>
  );
}
