export interface PageTableSizeResult {
  offsetBits: number;
  pageNumberBits: number;
  pageCount: number;
  tableBytes: number;
  processPages: number;
  usedTableBytes: number;
}

// Sizes of a single-level page table. pageSize must be a power of two.
export function pageTableSize(
  addressBits: number,
  pageSize: number,
  entrySize: number,
  processSize: number
): PageTableSizeResult {
  const offsetBits = Math.log2(pageSize);
  const pageNumberBits = Math.max(0, addressBits - offsetBits);
  const pageCount = 2 ** pageNumberBits;
  const processPages = Math.ceil(processSize / pageSize);

  return {
    offsetBits,
    pageNumberBits,
    pageCount,
    tableBytes: pageCount * entrySize,
    processPages,
    usedTableBytes: Math.min(processPages, pageCount) * entrySize,
  };
}
