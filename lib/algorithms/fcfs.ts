export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}

export interface FcfsResult {
  order: string[];
  waitingTimes: Record<string, number>;
  turnaroundTimes: Record<string, number>;
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}

export function fcfs(processes: Process[]): FcfsResult {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const waitingTimes: Record<string, number> = {};
  const turnaroundTimes: Record<string, number> = {};
  const order: string[] = [];

  let currentTime = 0;

  for (const process of sorted) {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    waitingTimes[process.id] = currentTime - process.arrivalTime;
    currentTime += process.burstTime;
    turnaroundTimes[process.id] = currentTime - process.arrivalTime;
    order.push(process.id);
  }

  const totalWaiting = Object.values(waitingTimes).reduce((sum, value) => sum + value, 0);
  const totalTurnaround = Object.values(turnaroundTimes).reduce((sum, value) => sum + value, 0);

  return {
    order,
    waitingTimes,
    turnaroundTimes,
    averageWaitingTime: totalWaiting / processes.length,
    averageTurnaroundTime: totalTurnaround / processes.length,
  };
}
