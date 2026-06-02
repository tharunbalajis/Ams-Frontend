import { Badge } from '@ams/ui';
import { STATUS_COLOR } from '../../constants/status.constants';
import { PRIORITY_COLOR } from '../../constants/priority.constants';
import type { ComplaintStatus, Priority } from '../../types/complaint.types';

export interface ComplaintStatusBadgeProps {
  status?:   ComplaintStatus;
  priority?: Priority;
}

const STATUS_LABEL: Record<ComplaintStatus, string> = {
  open:        'Open',
  assigned:    'Assigned',
  in_progress: 'In Progress',
  on_hold:     'On Hold',
  resolved:    'Resolved',
  closed:      'Closed',
  escalated:   'Escalated',
};

export function ComplaintStatusBadge({ status, priority }: ComplaintStatusBadgeProps) {
  if (status) {
    const variant = STATUS_COLOR[status] as 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
    return <Badge variant={variant}>{STATUS_LABEL[status]}</Badge>;
  }
  if (priority) {
    const variant = PRIORITY_COLOR[priority] as 'default' | 'secondary' | 'destructive' | 'warning';
    return (
      <Badge variant={variant} className="capitalize">
        {priority}
      </Badge>
    );
  }
  return null;
}
