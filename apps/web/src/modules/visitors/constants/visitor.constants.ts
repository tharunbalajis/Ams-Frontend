import type { VisitorType, VisitorStatus, EntryStatus } from '../types/visitor.types';

export const VISITOR_TYPE_OPTIONS: { label: string; value: VisitorType }[] = [
  { label: 'Guest',               value: 'GUEST' },
  { label: 'Delivery Personnel',  value: 'DELIVERY' },
  { label: 'Service Provider',    value: 'SERVICE_PROVIDER' },
  { label: 'Vendor',              value: 'VENDOR' },
  { label: 'Maintenance Staff',   value: 'MAINTENANCE' },
  { label: 'Emergency Personnel', value: 'EMERGENCY' },
];

export const VISITOR_STATUS_OPTIONS: { label: string; value: VisitorStatus }[] = [
  { label: 'Pending',     value: 'PENDING' },
  { label: 'Approved',    value: 'APPROVED' },
  { label: 'Rejected',    value: 'REJECTED' },
  { label: 'Blacklisted', value: 'BLACKLISTED' },
];

export const ENTRY_STATUS_OPTIONS: { label: string; value: EntryStatus }[] = [
  { label: 'Expected',    value: 'EXPECTED' },
  { label: 'Checked In',  value: 'CHECKED_IN' },
  { label: 'Checked Out', value: 'CHECKED_OUT' },
  { label: 'Overstay',    value: 'OVERSTAY' },
  { label: 'No Show',     value: 'NO_SHOW' },
];

export const ENTRY_STATUS_COLOR: Record<EntryStatus, string> = {
  EXPECTED:    'secondary',
  CHECKED_IN:  'success',
  CHECKED_OUT: 'outline',
  OVERSTAY:    'destructive',
  NO_SHOW:     'warning',
};

export const VISITOR_ROUTES = {
  LIST:         '/visitors',
  DETAIL:       '/visitors/:id',
  PRE_APPROVED: '/visitors/pre-approved',
  SOS:          '/visitors/sos',
} as const;

export const VISITOR_PAGE_SIZE = 20;
