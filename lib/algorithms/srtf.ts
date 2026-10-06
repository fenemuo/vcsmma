export interface Process {
  id: string;
  arrival: number;
  burst: number;
}

export interface SrtfResult extends Process {
  startTimes: number[];
  finish: number;
  waiting: number;
  turnaround: number;
}

export interface TimelineBlock {
  process: string;
  start: number;
  end: number;
}

export interface SRTFSimulation {
  results: SrtfResult[];
  timeline: TimelineBlock[];
}

/**
 * Shortest Remaining Time First — the preemptive version of SJF.
 * At every time unit the scheduler re-evaluates which arrived process
 * has the least remaining burst time and runs it, preempting the
 * currently running process if a shorter one arrives.
 */
export function srtf(processes: Process[]): SRTFSimulation {
  const procs = [...processes];
  const remaining = new Map(procs.map((p) => [p.id, p.burst]));
  const startTimesMap = new Map<string, number[]>();
  const finishMap = new Map<string, number>();
  const timeline: TimelineBlock[] = [];

  let currentTime = Math.min(...procs.map((p) => p.arrival));
  let lastProcessId: string | null = null;

  while (finishMap.size < procs.length) {
    const available = procs.filter(
      (p) => p.arrival <= currentTime && remaining.get(p.id)! > 0
    );

    if (!available.length) {
      currentTime++;
      lastProcessId = null;
      continue;
    }

    const current = available.reduce((shortest, p) =>
      remaining.get(p.id)! < remaining.get(shortest.id)! ? p : shortest
    );

    if (current.id === lastProcessId && timeline.length) {
      timeline[timeline.length - 1].end += 1;
    } else {
      timeline.push({
        process: current.id,
        start: currentTime,
        end: currentTime + 1,
      });
      startTimesMap.set(current.id, [
        ...(startTimesMap.get(current.id) ?? []),
        currentTime,
      ]);
    }

    remaining.set(current.id, remaining.get(current.id)! - 1);
    currentTime++;
    lastProcessId = current.id;

    if (remaining.get(current.id) === 0) {
      finishMap.set(current.id, currentTime);
    }
  }

  const results: SrtfResult[] = procs.map((p) => {
    const finish = finishMap.get(p.id)!;
    const turnaround = finish - p.arrival;
    const waiting = turnaround - p.burst;

    return {
      ...p,
      startTimes: startTimesMap.get(p.id) ?? [],
      finish,
      waiting,
      turnaround,
    };
  });

  return {
    results,
    timeline,
  };
}
