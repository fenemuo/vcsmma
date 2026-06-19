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


export function fcfs(processes: Process[]): Result[] {

    const sorted = [...processes]
        .sort((a, b) => a.arrival - b.arrival);

    let currentTime = 0;

    return sorted.map(process => {

        const start = Math.max(currentTime, process.arrival);

        const finish = start + process.burst;

        const waiting = start - process.arrival;

        const turnaround = finish - process.arrival;

        currentTime = finish;

        return {
            ...process,
            start,
            finish,
            waiting,
            turnaround
        };
    });
}

export const exampleFcfsProcesses: Process[] = [
    { id: "P1", arrival: 0, burst: 5 },
    { id: "P2", arrival: 1, burst: 3 },
    { id: "P3", arrival: 2, burst: 4 },
];

export const exampleFcfsResult = fcfs(exampleFcfsProcesses);

// Example usage:
// import { exampleFcfsResult } from "lib/algorithms/fcfs";
// console.log(exampleFcfsResult);
