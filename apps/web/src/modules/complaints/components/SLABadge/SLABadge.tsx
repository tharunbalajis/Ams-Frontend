import { Badge } from '@ams/ui';
import { SLA_STATUS_COLOR } from '../../constants/sla.constants';
import type { SLAStatus } from '../../types/sla.types';

export interface SLABadgeProps {
  status:           SLAStatus;
  remainingMinutes?: number;
  breached?:        boolean;
}

const SLA_LABEL: Record<SLAStatus, string> = {
  on_track: 'On Track',
  at_risk:  'At Risk',
  breached: 'SLA Breached',
  met:      'SLA Met',
};

export function SLABadge({ status, remainingMinutes, breached }: SLABadgeProps) {
  const variant = SLA_STATUS_COLOR[status] as 'success' | 'warning' | 'destructive';
  const label   = SLA_LABEL[status];

  const timeLabel =
    remainingMinutes !== undefined && remainingMinutes > 0
      ? ` (${remainingMinutes < 60 ? `${remainingMinutes}m` : `${Math.floor(remainingMinutes / 60)}h`})`
      : '';

  return (
    <Badge variant={breached ? 'destructive' : variant}>
      {label}{timeLabel}
    </Badge>
  );
}
