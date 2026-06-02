import { useState, useCallback } from 'react';

export interface UsePaginationState {
  page:     number;
  pageSize: number;
}

export interface UsePaginationReturn extends UsePaginationState {
  setPage:     (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset:       () => void;
}

export function usePagination(initialPage = 1, initialPageSize = 20): UsePaginationReturn {
  const [page,     setPageRaw]     = useState(initialPage);
  const [pageSize, setPageSizeRaw] = useState(initialPageSize);

  const setPage     = useCallback((p: number)  => setPageRaw(p), []);
  const setPageSize = useCallback((ps: number) => { setPageSizeRaw(ps); setPageRaw(1); }, []);
  const reset       = useCallback(() => { setPageRaw(initialPage); setPageSizeRaw(initialPageSize); }, [initialPage, initialPageSize]);

  return { page, pageSize, setPage, setPageSize, reset };
}
