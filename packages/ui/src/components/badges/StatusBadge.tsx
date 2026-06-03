import * as React from 'react';
import { Badge, type BadgeProps } from './Badge';

export type StatusValue =
  | 'active'      | 'inactive'    | 'pending'     | 'approved'    | 'rejected'
  | 'suspended'   | 'expired'     | 'draft'        | 'published'
  | 'paid'        | 'unpaid'      | 'overdue'
  | 'open'        | 'closed'      | 'resolved'     | 'in_progress'
  // Uppercase variants (AMS backend enum values)
  | 'ACTIVE'      | 'INACTIVE'    | 'PENDING'      | 'APPROVED'    | 'REJECTED'
  | 'SUSPENDED'   | 'EXPIRED'     | 'DRAFT'        | 'PUBLISHED'
  | 'PAID'        | 'UNPAID'      | 'OVERDUE'
  | 'OPEN'        | 'CLOSED'      | 'RESOLVED'     | 'IN_PROGRESS'
  // Extra AMS statuses
  | 'OCCUPIED'         | 'VACANT'       | 'RESERVED'     | 'UNDER_MAINTENANCE'
  | 'PARTIALLY_PAID'   | 'CANCELLED'    | 'ON_HOLD'      | 'ASSIGNED'
  | 'DRAFT'            | 'PENDING_APPROVAL' | 'APPROVED'
  | 'OWNER'            | 'TENANT'
  | string;

const STATUS_CONFIG: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
  // Lowercase originals
  active:       { label: 'Active',           variant: 'success' },
  inactive:     { label: 'Inactive',         variant: 'secondary' },
  pending:      { label: 'Pending',          variant: 'warning' },
  approved:     { label: 'Approved',         variant: 'success' },
  rejected:     { label: 'Rejected',         variant: 'destructive' },
  suspended:    { label: 'Suspended',        variant: 'destructive' },
  expired:      { label: 'Expired',          variant: 'secondary' },
  draft:        { label: 'Draft',            variant: 'secondary' },
  published:    { label: 'Published',        variant: 'success' },
  paid:         { label: 'Paid',             variant: 'success' },
  unpaid:       { label: 'Unpaid',           variant: 'warning' },
  overdue:      { label: 'Overdue',          variant: 'destructive' },
  open:         { label: 'Open',             variant: 'outline' },
  closed:       { label: 'Closed',           variant: 'secondary' },
  resolved:     { label: 'Resolved',         variant: 'success' },
  in_progress:  { label: 'In Progress',      variant: 'warning' },
  // Extra
  occupied:          { label: 'Occupied',         variant: 'success' },
  vacant:            { label: 'Vacant',            variant: 'secondary' },
  reserved:          { label: 'Reserved',          variant: 'warning' },
  under_maintenance: { label: 'Maintenance',       variant: 'warning' },
  partially_paid:    { label: 'Partial',           variant: 'warning' },
  cancelled:         { label: 'Cancelled',         variant: 'secondary' },
  on_hold:           { label: 'On Hold',           variant: 'secondary' },
  assigned:          { label: 'Assigned',          variant: 'outline' },
  pending_approval:  { label: 'Pending Approval',  variant: 'warning' },
  owner:             { label: 'Owner',             variant: 'default' },
  tenant:            { label: 'Tenant',            variant: 'secondary' },
};

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: StatusValue;
  showDot?: boolean;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showDot = true, ...props }, ref) => {
    const key = String(status).toLowerCase();
    const cfg = STATUS_CONFIG[key] ?? {
      label:   key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      variant: 'secondary' as const,
    };
    return (
      <Badge ref={ref} variant={cfg.variant} dot={showDot} {...props}>
        {cfg.label}
      </Badge>
    );
  },
);
StatusBadge.displayName = 'StatusBadge';

export { StatusBadge };
