export interface PageRequest {
  id: number;
}

export interface PageFrameResult {
  requestId: number;
  pageFault: boolean;
  frameState: (number | null)[];
}

export function lruPaging(requests: PageRequest[], frameCount: number): PageFrameResult[] {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const recent = new Map<number, number>();
  const results: PageFrameResult[] = [];
  let time = 0;

  for (const request of requests) {
    const hit = frames.includes(request.id);
    if (hit) {
      recent.set(request.id, time);
    } else {
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex >= 0) {
        frames[emptyIndex] = request.id;
      } else {
        let lruPage = frames[0]!;
        let lruTime = recent.get(lruPage) ?? -1;
        for (const page of frames) {
          const pageTime = recent.get(page!) ?? -1;
          if (pageTime < lruTime) {
            lruTime = pageTime;
            lruPage = page!;
          }
        }
        const replaceIndex = frames.indexOf(lruPage);
        frames[replaceIndex] = request.id;
      }
      recent.set(request.id, time);
    }

    results.push({
      requestId: request.id,
      pageFault: !hit,
      frameState: [...frames],
    });

    time += 1;
  }

  return results;
}
