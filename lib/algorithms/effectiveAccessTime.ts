// A TLB hit costs one TLB lookup plus one memory access; a miss also has to read
// the page table from memory first, so it costs one TLB lookup plus two memory accesses.
export function effectiveAccessTime(tlbTime: number, memoryTime: number, hitRatio: number) {
  const hitTime = tlbTime + memoryTime;
  const missTime = tlbTime + 2 * memoryTime;
  return {
    hitTime,
    missTime,
    eat: hitRatio * hitTime + (1 - hitRatio) * missTime,
  };
}
