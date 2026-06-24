import React from "react";

interface GanttTask {
  id: string;
  start: number | number[];
  finish: number;
  arrival?: number;
}

interface GanttChartProps {
  tasks: GanttTask[];
  maxTime: number;
}

export function GanttChart({ tasks, maxTime }: GanttChartProps) {
  const pixelsPerUnit = 40;
  const chartWidth = (maxTime + 1) * pixelsPerUnit;
  const taskHeight = 30;
  const gap = 10;
  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  const getColor = (index: number) => colors[index % colors.length];
  const getStartTimes = (task: GanttTask): number[] => {
    return Array.isArray(task.start) ? task.start : [task.start];
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={chartWidth + 100}
        height={tasks.length * (taskHeight + gap) + 60}
        className="border border-slate-700 bg-slate-800 rounded"
      >
        {/* Time axis */}
        <g>
          <line
            x1="80"
            y1="40"
            x2={chartWidth + 80}
            y2="40"
            stroke="#475569"
            strokeWidth="2"
          />
          {Array.from({ length: maxTime + 1 }).map((_, i) => (
            <g key={`time-${i}`}>
              <line
                x1={80 + i * pixelsPerUnit}
                y1="35"
                x2={80 + i * pixelsPerUnit}
                y2="45"
                stroke="#64748b"
                strokeWidth="1"
              />
              <text
                x={80 + i * pixelsPerUnit}
                y="30"
                fontSize="12"
                fill="#94a3b8"
                textAnchor="middle"
              >
                {i}
              </text>
            </g>
          ))}
        </g>

        {/* Tasks */}
        {tasks.map((task, taskIndex) => {
          const startTimes = getStartTimes(task);
          const y = 50 + taskIndex * (taskHeight + gap);

          return (
            <g key={task.id}>
              {/* Task label */}
              <text
                x="10"
                y={y + taskHeight / 2 + 4}
                fontSize="14"
                fontWeight="bold"
                fill="#e2e8f0"
                textAnchor="start"
              >
                {task.id}
              </text>

              {/* Task bars */}
              {startTimes.map((startTime, barIndex) => {
                let endTime = task.finish;
                
                // For Round Robin with multiple start times, calculate individual segment duration
                if (startTimes.length > 1) {
                  if (barIndex < startTimes.length - 1) {
                    endTime = startTimes[barIndex + 1];
                  }
                }

                const width = (endTime - startTime) * pixelsPerUnit;
                const x = 80 + startTime * pixelsPerUnit;

                return (
                  <g key={`bar-${barIndex}`}>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={taskHeight}
                      fill={getColor(taskIndex)}
                      stroke="#1e293b"
                      strokeWidth="1"
                      rx="4"
                    />
                    <text
                      x={x + width / 2}
                      y={y + taskHeight / 2 + 5}
                      fontSize="12"
                      fill="#f1f5f9"
                      textAnchor="middle"
                      fontWeight="500"
                    >
                      {startTime}-{endTime}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
