import type { SLAStatus } from '../types/sla.types';
import type { SLAPolicy } from '../types/sla.types';

export const SLA_STATUS_OPTIONS: { label: string; value: SLAStatus }[] = [
  { label: 'On Track', value: 'on_track' },
  { label: 'At Risk',  value: 'at_risk' },
  { label: 'Breached', value: 'breached' },
  { label: 'Met',      value: 'met' },
];

export const SLA_STATUS_COLOR: Record<SLAStatus, string> = {
  on_track: 'success',
  at_risk:  'warning',
  breached: 'destructive',
  met:      'success',
};

export const DEFAULT_SLA_POLICIES: SLAPolicy[] = [
  { priority: 'critical', targetHours: 4,  warningAt: 75 },
  { priority: 'high',     targetHours: 8,  warningAt: 75 },
  { priority: 'medium',   targetHours: 24, warningAt: 80 },
  { priority: 'low',      targetHours: 48, warningAt: 85 },
];
