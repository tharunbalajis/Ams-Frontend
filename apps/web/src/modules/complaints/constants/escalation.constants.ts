import type { EscalationLevel, EscalationStatus } from '../types/escalation.types';

export const ESCALATION_LEVEL_OPTIONS: { label: string; value: EscalationLevel }[] = [
  { label: 'Level 1 — Team Lead',  value: 1 },
  { label: 'Level 2 — Manager',    value: 2 },
  { label: 'Level 3 — Management', value: 3 },
];

export const ESCALATION_STATUS_OPTIONS: { label: string; value: EscalationStatus }[] = [
  { label: 'Pending',      value: 'pending' },
  { label: 'Acknowledged', value: 'acknowledged' },
  { label: 'Resolved',     value: 'resolved' },
];

export const ESCALATION_STATUS_COLOR: Record<EscalationStatus, string> = {
  pending:      'destructive',
  acknowledged: 'warning',
  resolved:     'success',
};

export const ESCALATION_TRIGGER_HOURS: Record<EscalationLevel, number> = {
  1: 24,
  2: 48,
  3: 72,
};
