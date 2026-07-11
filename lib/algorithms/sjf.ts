export interface Process {
  id: string;
  arrival: number;
  burst: number;
}

export interface SjfResult extends Process {
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

export interface SJFSimulation {
  results: SjfResult[];
  timeline: TimelineBlock[];
}

export function sjf(processes: Process[]): SJFSimulation {
  const pending = [...processes].sort(
    (a, b) => a.arrival - b.arrival
  );

  const results: SjfResult[] = [];
  const timeline: TimelineBlock[] = [];

  let currentTime = 0;

  while (pending.length) {
    const available = pending.filter(
      (p) => p.arrival <= currentTime
    );

    const next = available.length
      ? available.reduce((prev, cur) =>
          cur.burst < prev.burst ? cur : prev
        )
      : pending[0];

    pending.splice(pending.indexOf(next), 1);

    const start = Math.max(currentTime, next.arrival);

    const finish = start + next.burst;

    const waiting = start - next.arrival;

    const turnaround = finish - next.arrival;

    results.push({
      ...next,
      start,
      finish,
      waiting,
      turnaround,
    });

    timeline.push({
      process: next.id,
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