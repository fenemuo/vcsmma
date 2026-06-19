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

export function sjf(processes: Process[]): SjfResult[] {
  const pending = [...processes].sort((a, b) => a.arrival - b.arrival);
  const result: SjfResult[] = [];
  let currentTime = 0;

  while (pending.length) {
    const available = pending.filter(p => p.arrival <= currentTime);
    const next = available.length
      ? available.reduce((prev, cur) => (cur.burst < prev.burst ? cur : prev))
      : pending[0];

    const index = pending.indexOf(next);
    pending.splice(index, 1);

    const start = Math.max(currentTime, next.arrival);
    const finish = start + next.burst;
    const waiting = start - next.arrival;
    const turnaround = finish - next.arrival;

    result.push({
      ...next,
      start,
      finish,
      waiting,
      turnaround,
    });

    currentTime = finish;
  }

  return result;
}
