export interface Process {
  id: string;
  arrival: number;
  burst: number;
}

export interface SrtfSegment {
  id: string;
  start: number;
  end: number;
}

export interface SrtfResult {
  id: string;
  finish: number;
  waiting: number;
  turnaround: number;
  segments: SrtfSegment[];
}

export function srtf(processes: Process[]): SrtfResult[] {
  const pending = [...processes].sort((a, b) => a.arrival - b.arrival);
  const remaining = new Map(processes.map(p => [p.id, p.burst]));
  const segments = new Map<string, SrtfSegment[]>();
  const completed = new Map<string, SrtfResult>();
  let currentTime = 0;

  while (pending.length || [...remaining.values()].some(t => t > 0)) {
    const available = processes.filter(p => p.arrival <= currentTime && remaining.get(p.id)! > 0);
    if (!available.length) {
      currentTime = pending.find(p => remaining.get(p.id)! > 0)!.arrival;
      continue;
    }

    const current = available.reduce((prev, cur) => {
      const prevRem = remaining.get(prev.id)!;
      const curRem = remaining.get(cur.id)!;
      return curRem < prevRem ? cur : prev;
    });

    const start = currentTime;
    const nextArrival = pending.find(p => p.arrival > currentTime)?.arrival ?? Infinity;
    const run = Math.min(remaining.get(current.id)!, nextArrival - currentTime);
    const end = currentTime + run;

    if (!segments.has(current.id)) segments.set(current.id, []);
    segments.get(current.id)!.push({ id: current.id, start, end });

    currentTime = end;
    remaining.set(current.id, remaining.get(current.id)! - run);

    if (remaining.get(current.id)! === 0) {
      const finish = currentTime;
      const turnaround = finish - current.arrival;
      const waiting = turnaround - current.burst;
      completed.set(current.id, {
        id: current.id,
        finish,
        waiting,
        turnaround,
        segments: segments.get(current.id)!,
      });
    }
  }

  return Array.from(completed.values());
}
