import type { ComplaintStatus } from '../types/complaint.types';

export const STATUS_OPTIONS: { label: string; value: ComplaintStatus }[] = [
  { label: 'Open',        value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Resolved',    value: 'resolved' },
  { label: 'Closed',      value: 'closed' },
];

export const STATUS_COLOR: Record<ComplaintStatus, string> = {
  open:        'secondary',
  in_progress: 'warning',
  resolved:    'success',
  closed:      'outline',
};

export const STATUS_FLOW: ComplaintStatus[] = [
  'open',
  'in_progress',
  'resolved',
  'closed',
];

export const KANBAN_COLUMNS: { id: ComplaintStatus; label: string }[] = [
  { id: 'open',        label: 'Open' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved',    label: 'Resolved' },
  { id: 'closed',      label: 'Closed' },
];
