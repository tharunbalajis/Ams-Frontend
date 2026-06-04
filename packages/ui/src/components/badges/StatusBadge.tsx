import React from 'react';

export type StatusValue =
  | 'active'   | 'ACTIVE'
  | 'inactive' | 'INACTIVE'
  | 'pending'  | 'PENDING'
  | 'approved' | 'APPROVED'
  | 'rejected' | 'REJECTED'
  | 'suspended'| 'SUSPENDED'
  | 'expired'  | 'EXPIRED'
  | 'draft'    | 'DRAFT'
  | 'published'| 'PUBLISHED'
  | 'paid'     | 'PAID'
  | 'unpaid'   | 'UNPAID'
  | 'overdue'  | 'OVERDUE'
  | 'open'     | 'OPEN'
  | 'closed'   | 'CLOSED'
  | 'resolved' | 'RESOLVED'
  | 'cancelled'| 'CANCELLED'
  | 'in_progress' | 'IN_PROGRESS'
  | 'operational' | 'OPERATIONAL'
  | 'under_maintenance' | 'UNDER_MAINTENANCE'
  | 'retired'  | 'RETIRED'
  | 'terminated'| 'TERMINATED'
  | 'valid'    | 'VALID'
  | 'expiring_soon' | 'EXPIRING_SOON';

export interface StatusBadgeProps {
  status: StatusValue | string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  active:    'bg-green-100 text-green-700',
  inactive:  'bg-gray-100 text-gray-700',
  pending:   'bg-yellow-100 text-yellow-700',
  approved:  'bg-blue-100 text-blue-700',
  rejected:  'bg-red-100 text-red-700',
  suspended: 'bg-orange-100 text-orange-700',
  expired:   'bg-gray-200 text-gray-800',
  draft:     'bg-slate-100 text-slate-700',
  published: 'bg-emerald-100 text-emerald-700',
  paid:      'bg-green-100 text-green-700',
  unpaid:    'bg-red-100 text-red-700',
  overdue:   'bg-orange-100 text-orange-700',
  open:      'bg-blue-100 text-blue-700',
  closed:    'bg-gray-100 text-gray-700',
  resolved:  'bg-green-100 text-green-700',
  cancelled: 'bg-gray-200 text-gray-800',
  in_progress: 'bg-yellow-100 text-yellow-700',
  operational: 'bg-green-100 text-green-700',
  under_maintenance: 'bg-orange-100 text-orange-700',
  retired:   'bg-gray-200 text-gray-800',
  terminated:'bg-red-100 text-red-700',
  valid:     'bg-green-100 text-green-700',
  expiring_soon: 'bg-yellow-100 text-yellow-700',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const key = status.toLowerCase().replace(/ /g, '_');
  const style = statusStyles[key] ?? 'bg-gray-100 text-gray-700';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${style} ${className}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};

export default StatusBadge;
