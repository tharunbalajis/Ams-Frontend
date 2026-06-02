import type { ComplaintStatus } from '../types/complaint.types';

export const STATUS_OPTIONS: { label: string; value: ComplaintStatus }[] = [
  { label: 'Open',        value: 'open' },
  { label: 'Assigned',    value: 'assigned' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'On Hold',     value: 'on_hold' },
  { label: 'Resolved',    value: 'resolved' },
  { label: 'Closed',      value: 'closed' },
  { label: 'Escalated',   value: 'escalated' },
];

export const STATUS_COLOR: Record<ComplaintStatus, string> = {
  open:        'secondary',
  assigned:    'outline',
  in_progress: 'warning',
  on_hold:     'secondary',
  resolved:    'success',
  closed:      'outline',
  escalated:   'destructive',
};

export const STATUS_FLOW: ComplaintStatus[] = [
  'open',
  'assigned',
  'in_progress',
  'on_hold',
  'resolved',
  'closed',
];

export const KANBAN_COLUMNS: { id: ComplaintStatus; label: string }[] = [
  { id: 'open',        label: 'Open' },
  { id: 'assigned',    label: 'Assigned' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'on_hold',     label: 'On Hold' },
  { id: 'resolved',    label: 'Resolved' },
  { id: 'closed',      label: 'Closed' },
];
