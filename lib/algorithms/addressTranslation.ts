export interface TranslationResult {
  pageNumber: number;
  offset: number;
  frame: number | null;
  physicalAddress: number | null;
  error: "out-of-range" | "page-fault" | null;
}

// pageTable[page] is the frame holding that page, or null when the page is not resident.
export function translateAddress(
  logicalAddress: number,
  pageSize: number,
  pageTable: (number | null)[]
): TranslationResult {
  const pageNumber = Math.floor(logicalAddress / pageSize);
  const offset = logicalAddress % pageSize;

  if (pageNumber >= pageTable.length) {
    return { pageNumber, offset, frame: null, physicalAddress: null, error: "out-of-range" };
  }

  const frame = pageTable[pageNumber];
  if (frame === null) {
    return { pageNumber, offset, frame: null, physicalAddress: null, error: "page-fault" };
  }

  return { pageNumber, offset, frame, physicalAddress: frame * pageSize + offset, error: null };
}
