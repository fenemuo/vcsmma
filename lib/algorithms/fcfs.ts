export interface Process {
  id: string;
  arrival: number;
  burst: number;
}

export interface Result extends Process {
  start: number;
  finish: number;
  waiting: number;
  turnaround: number;
}

export interface TimelineBlock {
  process: string;
  start: number;
  end: number;
}

export interface FCFSSimulation {
  results: Result[];
  timeline: TimelineBlock[];
}

export function fcfs(processes: Process[]): FCFSSimulation {
  const sorted = [...processes].sort(
    (a, b) => a.arrival - b.arrival
  );

  let currentTime = 0;

  const results: Result[] = [];

  const timeline: TimelineBlock[] = [];

  for (const process of sorted) {
    const start = Math.max(currentTime, process.arrival);

    const finish = start + process.burst;

    const waiting = start - process.arrival;

    const turnaround = finish - process.arrival;

    results.push({
      ...process,
      start,
      finish,
      waiting,
      turnaround,
    });

    timeline.push({
      process: process.id,
      start,
      end: finish,
    });

    currentTime = finish;
  }

  return {
    results,
    timeline,
  };
}

export const exampleFcfsProcesses: Process[] = [
  { id: "P1", arrival: 0, burst: 5 },
  { id: "P2", arrival: 1, burst: 3 },
  { id: "P3", arrival: 2, burst: 4 },
];

export const exampleFcfsResult = fcfs(exampleFcfsProcesses);