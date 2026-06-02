export interface PaginationParams {
  page:     number;
  pageSize: number;
}

export interface SortParams {
  sortBy:  string;
  sortDir: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  [key: string]: unknown;
}

export type ListQueryParams = PaginationParams & Partial<SortParams> & FilterParams;

export interface PaginatedResult<T> {
  data:       T[];
  total:      number;
  page:       number;
  pageSize:   number;
  totalPages: number;
}
