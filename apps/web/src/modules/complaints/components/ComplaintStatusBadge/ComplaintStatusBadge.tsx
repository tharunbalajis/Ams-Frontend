import { Badge } from '@ams/ui';
import { STATUS_COLOR } from '../../constants/status.constants';
import { PRIORITY_COLOR } from '../../constants/priority.constants';
import type { ComplaintStatus, Priority } from '../../types/complaint.types';

export interface ComplaintStatusBadgeProps {
  status?:   ComplaintStatus;
  priority?: Priority;
}

const STATUS_LABEL: Record<ComplaintStatus, string> = {
  OPEN:        'Open',
  ASSIGNED:    'Assigned',
  IN_PROGRESS: 'In Progress',
  ON_HOLD:     'On Hold',
  RESOLVED:    'Resolved',
  CLOSED:      'Closed',
};

const PRIORITY_LABEL: Record<Priority, string> = {
  LOW:      'Low',
  MEDIUM:   'Medium',
  HIGH:     'High',
  CRITICAL: 'Critical',
};

export function ComplaintStatusBadge({ status, priority }: ComplaintStatusBadgeProps) {
  if (status) {
    const variant = STATUS_COLOR[status] as 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
    return <Badge variant={variant}>{STATUS_LABEL[status]}</Badge>;
  }
  if (priority) {
    const variant = PRIORITY_COLOR[priority] as 'default' | 'secondary' | 'destructive' | 'warning';
    return (
      <Badge variant={variant}>
        {PRIORITY_LABEL[priority]}
      </Badge>
    );
  }
  return null;
}
