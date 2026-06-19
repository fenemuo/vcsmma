export interface PageRequest {
  id: number;
}

export interface PageFrameResult {
  requestId: number;
  pageFault: boolean;
  frameState: (number | null)[];
}

export function fifoPaging(requests: PageRequest[], frameCount: number): PageFrameResult[] {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const queue: number[] = [];
  const results: PageFrameResult[] = [];

  for (const request of requests) {
    const hit = frames.includes(request.id);
    if (!hit) {
      if (queue.length < frameCount) {
        queue.push(request.id);
        frames[queue.length - 1] = request.id;
      } else {
        const evicted = queue.shift()!;
        const index = frames.indexOf(evicted);
        frames[index] = request.id;
        queue.push(request.id);
      }
    }

    results.push({
      requestId: request.id,
      pageFault: !hit,
      frameState: [...frames],
    });
  }

  return results;
}
