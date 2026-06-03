import type { Priority } from '../types/complaint.types';

export const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
  { label: 'Low',      value: 'LOW' },
  { label: 'Medium',   value: 'MEDIUM' },
  { label: 'High',     value: 'HIGH' },
  { label: 'Critical', value: 'CRITICAL' },
];

export const PRIORITY_COLOR: Record<Priority, string> = {
  LOW:      'secondary',
  MEDIUM:   'warning',
  HIGH:     'destructive',
  CRITICAL: 'destructive',
};

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  LOW:      1,
  MEDIUM:   2,
  HIGH:     3,
  CRITICAL: 4,
};
