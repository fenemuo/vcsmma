import type { ReactNode } from "react";

export const inputClass =
  "rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60";

export const breakdownRow = "flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm";
export const breakdownLabel =
  "min-w-[9rem] shrink-0 font-sans text-xs uppercase tracking-wide text-slate-500";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function Stat({ label, value, tone = "text-slate-100" }: { label: string; value: ReactNode; tone?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

export function ModuleHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 max-w-3xl text-sm text-slate-400">{description}</p>
    </div>
  );
}

const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];

export function formatBytes(bytes: number): string {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${Number(value.toFixed(2))} ${UNITS[unit]}`;
}
