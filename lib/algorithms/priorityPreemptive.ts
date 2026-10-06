export interface Process {
  id: string;
  arrival: number;
  burst: number;
  priority: number;
}

export interface PriorityPreemptiveResult extends Process {
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

export interface PriorityPreemptiveSimulation {
  results: PriorityPreemptiveResult[];
  timeline: TimelineBlock[];
}

/**
 * Preemptive Priority Scheduling.
 * At every time unit the scheduler re-evaluates which arrived process
 * has the highest priority (lowest number) and runs it, preempting the
 * currently running process if a higher-priority one arrives.
 */
export function priorityPreemptive(
  processes: Process[]
): PriorityPreemptiveSimulation {
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

    const current = available.reduce((highest, p) =>
      p.priority < highest.priority ? p : highest
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

  const results: PriorityPreemptiveResult[] = procs.map((p) => {
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
