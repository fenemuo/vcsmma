export interface PageRequest {
  id: number;
}

export interface PageFrameResult {
  requestId: number;
  pageFault: boolean;
  frameState: (number | null)[];
}

export function optimalPaging(requests: PageRequest[], frameCount: number): PageFrameResult[] {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const results: PageFrameResult[] = [];

  requests.forEach((request, i) => {
    const hit = frames.includes(request.id);
    if (!hit) {
      const emptyIndex = frames.indexOf(null);
      if (emptyIndex >= 0) {
        frames[emptyIndex] = request.id;
      } else {
        // Evict the page whose next use is farthest away (or never used again).
        let replaceIndex = 0;
        let farthest = -1;
        frames.forEach((page, index) => {
          const nextUse = requests.findIndex((r, j) => j > i && r.id === page);
          const distance = nextUse === -1 ? Infinity : nextUse;
          if (distance > farthest) {
            farthest = distance;
            replaceIndex = index;
          }
        });
        frames[replaceIndex] = request.id;
      }
    }

    results.push({
      requestId: request.id,
      pageFault: !hit,
      frameState: [...frames],
    });
  });

  return results;
}
