export interface Process {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
}

export interface RoundRobinResult extends Process {
  startTimes: number[];
  finish: number;
  waiting: number;
  turnaround: number;
}

export function roundRobin(processes: Process[], quantum: number): RoundRobinResult[] {
  const queue = [...processes].sort((a, b) => a.arrival - b.arrival);
  const remaining = new Map(queue.map(p => [p.id, p.burst]));
  const results = new Map<string, RoundRobinResult>();
  let currentTime = 0;
  const ready: Process[] = [];

  while (queue.length || ready.length) {
    while (queue.length && queue[0].arrival <= currentTime) {
      ready.push(queue.shift()!);
    }

    if (!ready.length) {
      currentTime = queue[0].arrival;
      continue;
    }

    const process = ready.shift()!;
    const start = currentTime;
    const work = Math.min(quantum, remaining.get(process.id)!);
    const finish = start + work;
    currentTime = finish;

    if (!results.has(process.id)) {
      results.set(process.id, {
        id: process.id,
        arrival: process.arrival,
        burst: process.burst,
        priority: process.priority,
        startTimes: [start],
        finish: 0,
        waiting: 0,
        turnaround: 0,
      });
    } else {
      results.get(process.id)!.startTimes.push(start);
    }

    remaining.set(process.id, remaining.get(process.id)! - work);

    while (queue.length && queue[0].arrival <= currentTime) {
      ready.push(queue.shift()!);
    }

    if (remaining.get(process.id)! > 0) {
      ready.push(process);
    } else {
      const procResult = results.get(process.id)!;
      procResult.finish = finish;
      procResult.turnaround = finish - process.arrival;
      procResult.waiting = procResult.turnaround - process.burst;
    }
  }

  return Array.from(results.values());
}
