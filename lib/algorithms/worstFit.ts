export interface MemoryBlock {
  id: string;
  size: number;
}

export interface AllocationResult {
  processId: string;
  blockId: string | null;
  allocatedSize: number;
}

export function worstFit(blocks: MemoryBlock[], processes: MemoryBlock[]): AllocationResult[] {
  const remaining = blocks.map(block => ({ ...block }));
  const results: AllocationResult[] = [];

  for (const process of processes) {
    let worstIndex = -1;
    let worstSize = -1;

    for (let i = 0; i < remaining.length; i++) {
      const block = remaining[i];
      if (block.size >= process.size && block.size > worstSize) {
        worstSize = block.size;
        worstIndex = i;
      }
    }

    if (worstIndex >= 0) {
      const block = remaining[worstIndex];
      results.push({ processId: process.id, blockId: block.id, allocatedSize: process.size });
      block.size -= process.size;
    } else {
      results.push({ processId: process.id, blockId: null, allocatedSize: 0 });
    }
  }

  return results;
}
