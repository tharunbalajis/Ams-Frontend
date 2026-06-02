export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'AMS';
export const APP_ENV  = (import.meta.env.VITE_APP_ENV ?? 'development') as 'development' | 'staging' | 'production';

export const DEFAULT_PAGE_SIZE  = 20;
export const PAGE_SIZE_OPTIONS  = [10, 20, 50, 100] as const;
export const MAX_FILE_SIZE_MB   = 10;
export const MAX_FILE_SIZE      = MAX_FILE_SIZE_MB * 1024 * 1024;

export const DATE_FORMAT      = 'MMM d, yyyy';
export const DATETIME_FORMAT  = 'MMM d, yyyy HH:mm';
export const TIME_FORMAT      = 'HH:mm';

export const DEBOUNCE_DELAY    = 300;
export const SEARCH_MIN_LENGTH = 2;
export const TABLE_PAGE_SIZE   = 20;

export const CURRENCY_CODE   = 'PHP';
export const CURRENCY_LOCALE = 'en-PH';
