export interface Process {
  id: string;
  arrival: number;
  burst: number;
  priority: number;
}

export interface PriorityResult extends Process {
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

export interface PrioritySimulation {
  results: PriorityResult[];
  timeline: TimelineBlock[];
}

export function priorityScheduling(
  processes: Process[]
): PrioritySimulation {
  const pending = [...processes].sort(
    (a, b) => a.arrival - b.arrival
  );

  const results: PriorityResult[] = [];
  const timeline: TimelineBlock[] = [];

  let currentTime = 0;

  while (pending.length) {
    const available = pending.filter(
      (p) => p.arrival <= currentTime
    );

    const next = available.length
      ? available.reduce((prev, cur) =>
          cur.priority < prev.priority ? cur : prev
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