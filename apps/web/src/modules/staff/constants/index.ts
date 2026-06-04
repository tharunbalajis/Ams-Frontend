import type { StaffRole } from '@/api/staff.api';

export const STAFF_ROLE_OPTIONS: { label: string; value: StaffRole }[] = [
  { label: 'Security',     value: 'SECURITY' },
  { label: 'Housekeeping', value: 'HOUSEKEEPING' },
  { label: 'Maintenance',  value: 'MAINTENANCE' },
  { label: 'Vendor',       value: 'VENDOR' },
];

export const STAFF_ROUTES = {
  LIST: '/staff',
} as const;
