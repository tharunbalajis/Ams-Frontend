import * as React from 'react';
import { Badge, type BadgeProps } from './Badge';

export type StatusValue =
  | 'active' | 'inactive' | 'pending' | 'approved' | 'rejected'
  | 'suspended' | 'expired' | 'draft' | 'published'
  | 'paid' | 'unpaid' | 'overdue'
  | 'open' | 'closed' | 'resolved' | 'in_progress';

const STATUS_CONFIG: Record<StatusValue, { label: string; variant: BadgeProps['variant'] }> = {
  active:      { label: 'Active',       variant: 'success' },
  inactive:    { label: 'Inactive',     variant: 'muted' },
  pending:     { label: 'Pending',      variant: 'warning' },
  approved:    { label: 'Approved',     variant: 'success' },
  rejected:    { label: 'Rejected',     variant: 'destructive' },
  suspended:   { label: 'Suspended',    variant: 'destructive' },
  expired:     { label: 'Expired',      variant: 'muted' },
  draft:       { label: 'Draft',        variant: 'secondary' },
  published:   { label: 'Published',    variant: 'success' },
  paid:        { label: 'Paid',         variant: 'success' },
  unpaid:      { label: 'Unpaid',       variant: 'warning' },
  overdue:     { label: 'Overdue',      variant: 'destructive' },
  open:        { label: 'Open',         variant: 'info' },
  closed:      { label: 'Closed',       variant: 'muted' },
  resolved:    { label: 'Resolved',     variant: 'success' },
  in_progress: { label: 'In Progress',  variant: 'info' },
};

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: StatusValue;
  showDot?: boolean;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showDot = true, ...props }, ref) => {
    const cfg = STATUS_CONFIG[status] ?? { label: status, variant: 'secondary' as const };
    return (
      <Badge ref={ref} variant={cfg.variant} dot={showDot} {...props}>
        {cfg.label}
      </Badge>
    );
  },
);
StatusBadge.displayName = 'StatusBadge';

export { StatusBadge };
