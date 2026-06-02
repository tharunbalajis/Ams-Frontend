import type { LeaseStatus } from '../types/lease.types';

export const LEASE_STATUS_OPTIONS: { label: string; value: LeaseStatus }[] = [
  { label: 'Active',    value: 'active' },
  { label: 'Expired',   value: 'expired' },
  { label: 'Pending',   value: 'pending' },
  { label: 'Cancelled', value: 'cancelled' },
];

export const LEASE_MIN_DURATION_MONTHS = 1;
export const LEASE_MAX_DURATION_MONTHS = 36;
