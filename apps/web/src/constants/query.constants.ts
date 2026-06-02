export const STALE_TIME = {
  SHORT:   1000 * 30,       // 30 seconds
  DEFAULT: 1000 * 60 * 5,   // 5 minutes
  LONG:    1000 * 60 * 30,  // 30 minutes
  FOREVER: Infinity,
} as const;

export const GC_TIME = {
  DEFAULT: 1000 * 60 * 10, // 10 minutes
  LONG:    1000 * 60 * 60, // 1 hour
} as const;

export const RETRY_COUNT = {
  NONE:    0,
  DEFAULT: 1,
  MAX:     3,
} as const;
