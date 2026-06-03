import type { ComplaintStatus } from '../types/complaint.types';

export const STATUS_OPTIONS: { label: string; value: ComplaintStatus }[] = [
  { label: 'Open',        value: 'OPEN' },
  { label: 'Assigned',    value: 'ASSIGNED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'On Hold',     value: 'ON_HOLD' },
  { label: 'Resolved',    value: 'RESOLVED' },
  { label: 'Closed',      value: 'CLOSED' },
];

export const STATUS_COLOR: Record<ComplaintStatus, string> = {
  OPEN:        'secondary',
  ASSIGNED:    'outline',
  IN_PROGRESS: 'warning',
  ON_HOLD:     'secondary',
  RESOLVED:    'success',
  CLOSED:      'outline',
};

export const STATUS_FLOW: ComplaintStatus[] = [
  'OPEN',
  'ASSIGNED',
  'IN_PROGRESS',
  'ON_HOLD',
  'RESOLVED',
  'CLOSED',
];

export const KANBAN_COLUMNS: { id: ComplaintStatus; label: string }[] = [
  { id: 'OPEN',        label: 'Open' },
  { id: 'ASSIGNED',    label: 'Assigned' },
  { id: 'IN_PROGRESS', label: 'In Progress' },
  { id: 'ON_HOLD',     label: 'On Hold' },
  { id: 'RESOLVED',    label: 'Resolved' },
  { id: 'CLOSED',      label: 'Closed' },
];
