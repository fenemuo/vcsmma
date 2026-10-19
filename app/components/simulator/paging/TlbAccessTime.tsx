"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { effectiveAccessTime } from "@/lib/algorithms/effectiveAccessTime";
import { Field, ModuleHeader, Stat, breakdownLabel, breakdownRow, inputClass } from "./shared";

const LINE = "#818cf8";
const AXIS = "#64748b";
const GRID = "#1e293b";
const SURFACE = "#020617";

const fmt = (n: number) => Number(n.toFixed(2)).toString();

export function TlbAccessTime() {
  const [tlbTime, setTlbTime] = useState(20);
  const [memoryTime, setMemoryTime] = useState(100);
  const [hitPercent, setHitPercent] = useState(80);

  const h = hitPercent / 100;
  const { hitTime, missTime, eat } = effectiveAccessTime(tlbTime, memoryTime, h);
  const slowdown = ((eat - memoryTime) / memoryTime) * 100;

  const data = Array.from({ length: 101 }, (_, percent) => ({
    hit: percent,
    eat: Number(effectiveAccessTime(tlbTime, memoryTime, percent / 100).eat.toFixed(2)),
  }));

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="TLB & Effective Access Time"
        description="On a TLB hit the frame number comes straight from the TLB. On a miss the page table must be read from memory first, costing an extra memory access."
      />

      <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:grid-cols-3">
        <Field label="TLB lookup time (ns)">
          <input
            className={inputClass}
            type="number"
            min={0}
            value={tlbTime}
            onChange={(e) => setTlbTime(Math.max(0, Number(e.target.value) || 0))}
          />
        </Field>
        <Field label="Memory access time (ns)">
          <input
            className={inputClass}
            type="number"
            min={1}
            value={memoryTime}
            onChange={(e) => setMemoryTime(Math.max(1, Number(e.target.value) || 1))}
          />
        </Field>
        <Field label="TLB hit ratio (%)">
          <input
            className={inputClass}
            type="number"
            min={0}
            max={100}
            value={hitPercent}
            onChange={(e) => setHitPercent(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
          />
        </Field>
        <div className="sm:col-span-3">
          <input
            aria-label="TLB hit ratio"
            className="w-full accent-indigo-500"
            type="range"
            min={0}
            max={100}
            value={hitPercent}
            onChange={(e) => setHitPercent(Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0% (every lookup misses)</span>
            <span>100% (every lookup hits)</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Effective access time" value={`${fmt(eat)} ns`} tone="text-indigo-300" />
        <Stat label="Slower than raw memory" value={`${fmt(slowdown)}%`} tone="text-amber-300" />
        <Stat label="Hit / miss cost" value={`${fmt(hitTime)} / ${fmt(missTime)} ns`} />
      </div>

      <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
        <h4 className="mb-2 text-sm font-medium text-slate-200">Calculation Breakdown</h4>
        <div className={breakdownRow}>
          <span className={breakdownLabel}>Hit time</span>
          <span className="text-slate-300">
            TLB + memory = {tlbTime} + {memoryTime} = <span className="text-emerald-400">{fmt(hitTime)} ns</span>
          </span>
        </div>
        <div className={breakdownRow}>
          <span className={breakdownLabel}>Miss time</span>
          <span className="text-slate-300">
            TLB + 2 × memory = {tlbTime} + 2 × {memoryTime} = <span className="text-emerald-400">{fmt(missTime)} ns</span>
          </span>
        </div>
        <div className={breakdownRow}>
          <span className={breakdownLabel}>EAT</span>
          <span className="text-slate-300">h × hit time + (1 − h) × miss time</span>
        </div>
        <div className={breakdownRow}>
          <span className={breakdownLabel} />
          <span className="text-slate-300">
            = {fmt(h)} × {fmt(hitTime)} + {fmt(1 - h)} × {fmt(missTime)}
          </span>
        </div>
        <div className={breakdownRow}>
          <span className={breakdownLabel} />
          <span className="text-slate-300">
            = {fmt(h * hitTime)} + {fmt((1 - h) * missTime)}
          </span>
        </div>
        <div className={breakdownRow}>
          <span className={breakdownLabel} />
          <span className="text-slate-300">
            = <span className="text-emerald-400">{fmt(eat)} ns</span>
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
        <h4 className="text-sm font-medium text-slate-200">Effective access time vs. TLB hit ratio</h4>
        <p className="mb-3 text-xs text-slate-500">
          The dashed line is a single memory access ({memoryTime} ns), the cost with no paging overhead at all.
        </p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 12, right: 16, bottom: 20, left: 8 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis
                dataKey="hit"
                type="number"
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${v}%`}
                stroke={AXIS}
                tick={{ fill: AXIS, fontSize: 12 }}
                label={{ value: "TLB hit ratio", position: "insideBottom", offset: -12, fill: AXIS, fontSize: 12 }}
              />
              <YAxis
                domain={[0, "auto"]}
                stroke={AXIS}
                tick={{ fill: AXIS, fontSize: 12 }}
                tickFormatter={(v) => `${v} ns`}
                width={64}
              />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0" }}
                labelStyle={{ color: "#94a3b8" }}
                cursor={{ stroke: "#475569" }}
                labelFormatter={(label) => `Hit ratio ${label}%`}
                formatter={(value) => [`${value} ns`, "EAT"]}
              />
              <ReferenceLine y={memoryTime} stroke={AXIS} strokeDasharray="4 4" />
              <Line type="linear" dataKey="eat" stroke={LINE} strokeWidth={2} dot={false} isAnimationActive={false} />
              <ReferenceDot x={hitPercent} y={Number(eat.toFixed(2))} r={6} fill={LINE} stroke={SURFACE} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
