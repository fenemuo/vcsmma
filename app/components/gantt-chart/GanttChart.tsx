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

export function GanttChart({ blocks, maxTime }: GanttChartProps) {
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

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h3 className="mb-6 text-xl font-semibold text-white">
        CPU Execution Timeline (Gantt Chart)
      </h3>

      <svg
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

        {/* Blocks */}
        {blocks.map((block, index) => {
          const x = block.start * pixelsPerUnit + 20;
          const width = (block.end - block.start) * pixelsPerUnit;

          return (
            <g key={`${block.process}-${index}`}>
              <rect
                x={x}
                y={20}
                width={width}
                height={45}
                rx={10}
                fill={block.color || colors[index % colors.length]}
                stroke="#0f172a"
                strokeWidth={2}
                filter="url(#shadow)"
              />

              {/* Process Label */}
              <text
                x={x + width / 2}
                y={48}
                fill="white"
                fontWeight="bold"
                fontSize={15}
                textAnchor="middle"
              >
                {block.process}
              </text>

              {/* Start Time */}
              <text
                x={x}
                y={82}
                fill="#CBD5E1"
                fontSize={13}
                textAnchor="middle"
              >
                {block.start}
              </text>

              {/* End Time */}
              {index === blocks.length - 1 && (
                <text
                  x={x + width}
                  y={82}
                  fill="#CBD5E1"
                  fontSize={13}
                  textAnchor="middle"
                >
                  {block.end}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
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