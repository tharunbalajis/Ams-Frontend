import type { Priority } from '../types/complaint.types';

export const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
  { label: 'Low',      value: 'low' },
  { label: 'Medium',   value: 'medium' },
  { label: 'High',     value: 'high' },
  { label: 'Critical', value: 'critical' },
];

export const PRIORITY_COLOR: Record<Priority, string> = {
  low:      'secondary',
  medium:   'warning',
  high:     'destructive',
  critical: 'destructive',
};

export const PRIORITY_WEIGHT: Record<Priority, number> = {
  low:      1,
  medium:   2,
  high:     3,
  critical: 4,
};
