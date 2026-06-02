export interface ApiResponse<T = unknown> {
  data:     T;
  message?: string;
  success:  boolean;
}

export interface ApiError {
  message:    string;
  statusCode: number;
  errors?:    Record<string, string[]>;
}

export interface PaginationMeta {
  total:           number;
  page:            number;
  pageSize:        number;
  totalPages:      number;
  hasNextPage:     boolean;
  hasPreviousPage: boolean;
}

export interface ApiListResponse<T = unknown> {
  data:    T[];
  meta:    PaginationMeta;
  message?: string;
  success: boolean;
}
