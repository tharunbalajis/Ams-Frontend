import type { VisitorType } from '../types/visitor.types';

export const VISITOR_TYPE_OPTIONS: { label: string; value: VisitorType }[] = [
  { label: 'Guest',         value: 'GUEST' },
  { label: 'Delivery',      value: 'DELIVERY' },
  { label: 'Domestic Help', value: 'DOMESTIC_HELP' },
  { label: 'Service',       value: 'SERVICE' },
  { label: 'Contractor',    value: 'CONTRACTOR' },
  { label: 'Broker',        value: 'BROKER' },
  { label: 'Unknown',       value: 'UNKNOWN' },
];

export const VISITOR_STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'Active',    value: 'active' },
  { label: 'Inactive',  value: 'inactive' },
];

export const ENTRY_STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'Not checked in', value: 'not_checked_in' },
  { label: 'Checked In',     value: 'checked_in' },
  { label: 'Checked Out',    value: 'checked_out' },
];

export const ENTRY_STATUS_COLOR: Record<string, string> = {
  not_checked_in: 'secondary',
  checked_in:     'success',
  checked_out:    'outline',
};

export const VISITOR_ROUTES = {
  LIST:         '/visitors',
  DETAIL:       '/visitors/:id',
  PRE_APPROVED: '/visitors/pre-approved',
  SOS:          '/visitors/sos',
} as const;

export const VISITOR_PAGE_SIZE = 20;
