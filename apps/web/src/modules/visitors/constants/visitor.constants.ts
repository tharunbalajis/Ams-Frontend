import type { VisitorType, VisitorStatus, EntryStatus } from '../types/visitor.types';

export const VISITOR_TYPE_OPTIONS: { label: string; value: VisitorType }[] = [
  { label: 'Guest',              value: 'guest' },
  { label: 'Delivery Personnel', value: 'delivery' },
  { label: 'Service Provider',   value: 'service_provider' },
  { label: 'Vendor',             value: 'vendor' },
  { label: 'Maintenance Staff',  value: 'maintenance' },
  { label: 'Emergency Personnel',value: 'emergency' },
];

export const VISITOR_STATUS_OPTIONS: { label: string; value: VisitorStatus }[] = [
  { label: 'Pending',    value: 'pending' },
  { label: 'Approved',   value: 'approved' },
  { label: 'Rejected',   value: 'rejected' },
  { label: 'Blacklisted',value: 'blacklisted' },
];

export const ENTRY_STATUS_OPTIONS: { label: string; value: EntryStatus }[] = [
  { label: 'Expected',    value: 'expected' },
  { label: 'Checked In',  value: 'checked_in' },
  { label: 'Checked Out', value: 'checked_out' },
  { label: 'Overstay',    value: 'overstay' },
  { label: 'No Show',     value: 'no_show' },
];

export const ENTRY_STATUS_COLOR: Record<EntryStatus, string> = {
  expected:    'secondary',
  checked_in:  'success',
  checked_out: 'outline',
  overstay:    'destructive',
  no_show:     'warning',
};

export const VISITOR_ROUTES = {
  LIST:          '/visitors',
  DETAIL:        '/visitors/:id',
  PRE_APPROVED:  '/visitors/pre-approved',
  ATTENDANCE:    '/visitors/attendance',
  SOS:           '/visitors/sos',
} as const;

export const VISITOR_PAGE_SIZE = 20;
