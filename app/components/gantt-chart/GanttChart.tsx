"use client";

import { useState } from "react";

interface GanttBlock {
  process: string;
  start: number;
  end: number;
  color?: string;
}

interface GanttChartProps {
  blocks: GanttBlock[];
  maxTime: number;
}

const STEP_DELAY = 0.45;

export function GanttChart({ blocks, maxTime }: GanttChartProps) {
  const [replayKey, setReplayKey] = useState(0);
  const pixelsPerUnit = 60;
  const chartHeight = 90;
  const chartWidth = maxTime * pixelsPerUnit;

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
  ];

  const totalDuration = blocks.length * STEP_DELAY;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            CPU Execution Timeline (Gantt Chart)
          </h3>
          <p className="text-xs text-slate-500">Time axis in milliseconds (ms)</p>
        </div>
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
        >
          ▶ Replay
        </button>
      </div>

      <svg
        key={replayKey}
        width={chartWidth + 80}
        height={chartHeight}
        className="overflow-visible"
      >
        {/* Shadow */}
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        {/* Blocks, revealed one after another in execution order */}
        {blocks.map((block, index) => {
          const x = block.start * pixelsPerUnit + 20;
          const width = (block.end - block.start) * pixelsPerUnit;
          const delay = index * STEP_DELAY;

          return (
            <g key={`${block.process}-${index}`}>
              <rect
                className="gantt-block"
                x={x}
                y={20}
                width={width}
                height={45}
                rx={10}
                fill={block.color || colors[index % colors.length]}
                stroke="#0f172a"
                strokeWidth={2}
                filter="url(#shadow)"
                style={{ animationDelay: `${delay}s` }}
              />

              {/* Process Label */}
              <text
                className="gantt-label"
                x={x + width / 2}
                y={48}
                fill="white"
                fontWeight="bold"
                fontSize={15}
                textAnchor="middle"
                style={{ animationDelay: `${delay + 0.35}s` }}
              >
                {block.process}
              </text>

              {/* Start Time */}
              <text
                className="gantt-label"
                x={x}
                y={82}
                fill="#CBD5E1"
                fontSize={13}
                textAnchor="middle"
                style={{ animationDelay: `${delay + 0.35}s` }}
              >
                {block.start}
              </text>

              {/* End Time */}
              {index === blocks.length - 1 && (
                <text
                  className="gantt-label"
                  x={x + width}
                  y={82}
                  fill="#CBD5E1"
                  fontSize={13}
                  textAnchor="middle"
                  style={{ animationDelay: `${delay + 0.35}s` }}
                >
                  {block.end}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        className="mt-6 flex flex-wrap gap-4 gantt-label"
        style={{ animationDelay: `${totalDuration}s` }}
      >
        {Array.from(new Set(blocks.map((b) => b.process))).map(
          (process, index) => (
            <div key={process} className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded"
                style={{
                  background: colors[index % colors.length],
                }}
              />
              <span className="text-sm text-slate-300">{process}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
