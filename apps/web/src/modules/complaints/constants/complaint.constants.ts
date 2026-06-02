import type { ComplaintCategory, ComplaintType } from '../types/complaint.types';

export const COMPLAINT_CATEGORY_OPTIONS: { label: string; value: ComplaintCategory }[] = [
  { label: 'Maintenance',  value: 'maintenance' },
  { label: 'Electrical',   value: 'electrical' },
  { label: 'Plumbing',     value: 'plumbing' },
  { label: 'Security',     value: 'security' },
  { label: 'Housekeeping', value: 'housekeeping' },
  { label: 'Parking',      value: 'parking' },
  { label: 'Noise',        value: 'noise' },
  { label: 'Amenities',    value: 'amenities' },
  { label: 'Other',        value: 'other' },
];

export const COMPLAINT_TYPE_OPTIONS: { label: string; value: ComplaintType }[] = [
  { label: 'General',   value: 'general' },
  { label: 'Urgent',    value: 'urgent' },
  { label: 'Repeat',    value: 'repeat' },
  { label: 'Anonymous', value: 'anonymous' },
];

export const COMPLAINT_ROUTES = {
  LIST:      '/complaints',
  CREATE:    '/complaints/create',
  DETAIL:    '/complaints/:id',
  DASHBOARD: '/complaints/dashboard',
  KANBAN:    '/complaints/kanban',
} as const;

export const COMPLAINT_PAGE_SIZE = 20;
