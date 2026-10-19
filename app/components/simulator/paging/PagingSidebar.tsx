"use client";

import Link from "next/link";

export type PagingModule = "translation" | "table-size" | "tlb" | "replacement";

interface PagingSidebarProps {
  module: PagingModule;
  onSelect: (module: PagingModule) => void;
}

const modules: { value: PagingModule; label: string; hint: string }[] = [
  { value: "translation", label: "Address Translation", hint: "Logical → physical, step by step" },
  { value: "table-size", label: "Page Table Size", hint: "Why flat tables get huge" },
  { value: "tlb", label: "TLB & Access Time", hint: "Effective access time vs hit ratio" },
  { value: "replacement", label: "Page Replacement", hint: "FIFO, LRU, Optimal, Belady" },
];

export function PagingSidebar({ module, onSelect }: PagingSidebarProps) {
  return (
    <aside className="h-fit space-y-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 lg:sticky lg:top-20">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Paging
        </h2>
        <nav className="space-y-1">
          {modules.map((item) => {
            const active = module === item.value;
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
          Looking for CPU scheduling?{" "}
          <Link href="/simulator" className="text-indigo-400 underline hover:text-indigo-300">
            Try it here
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
