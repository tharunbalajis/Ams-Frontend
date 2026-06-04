import React from 'react';

export type StatusValue =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | 'expired'
  | 'draft'
  | 'published'
  | 'paid'
  | 'unpaid'
  | 'overdue';

interface StatusBadgeProps {
  status: StatusValue;
  className?: string;
}

const statusStyles: Record<StatusValue, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  suspended: 'bg-orange-100 text-orange-700',
  expired: 'bg-gray-200 text-gray-800',
  draft: 'bg-slate-100 text-slate-700',
  published: 'bg-emerald-100 text-emerald-700',
  paid: 'bg-green-100 text-green-700',
  unpaid: 'bg-red-100 text-red-700',
  overdue: 'bg-orange-100 text-orange-700',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;