export type Nullable<T>  = T | null;
export type Optional<T>  = T | undefined;
export type ID           = string;
export type Timestamp    = string; // ISO 8601
export type DateString   = string; // YYYY-MM-DD

export type SortDirection = 'asc' | 'desc';

export type ValueOf<T>   = T[keyof T];

export type PartialBy<T, K extends keyof T>  = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface SelectOption<T = string> {
  label:     string;
  value:     T;
  disabled?: boolean;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
