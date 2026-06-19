export interface MemoryBlock {
  id: string;
  size: number;
}

export interface AllocationResult {
  processId: string;
  blockId: string | null;
  allocatedSize: number;
}

export function firstFit(blocks: MemoryBlock[], processes: MemoryBlock[]): AllocationResult[] {
  const remaining = blocks.map(block => ({ ...block }));
  const results: AllocationResult[] = [];

  for (const process of processes) {
    const fit = remaining.find(block => block.size >= process.size);
    if (fit) {
      results.push({ processId: process.id, blockId: fit.id, allocatedSize: process.size });
      fit.size -= process.size;
    } else {
      results.push({ processId: process.id, blockId: null, allocatedSize: 0 });
    }
  }

  return results;
}
