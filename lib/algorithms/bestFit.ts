export interface MemoryBlock {
  id: string;
  size: number;
}

export interface AllocationResult {
  processId: string;
  blockId: string | null;
  allocatedSize: number;
}

export function bestFit(blocks: MemoryBlock[], processes: MemoryBlock[]): AllocationResult[] {
  const remaining = blocks.map(block => ({ ...block }));
  const results: AllocationResult[] = [];

  for (const process of processes) {
    let bestIndex = -1;
    let bestSize = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const block = remaining[i];
      if (block.size >= process.size && block.size < bestSize) {
        bestSize = block.size;
        bestIndex = i;
      }
    }

    if (bestIndex >= 0) {
      const block = remaining[bestIndex];
      results.push({ processId: process.id, blockId: block.id, allocatedSize: process.size });
      block.size -= process.size;
    } else {
      results.push({ processId: process.id, blockId: null, allocatedSize: 0 });
    }
  }

  return results;
}
