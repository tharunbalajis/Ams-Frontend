import type { LeaseStatus } from '../types/lease.types';

export const LEASE_STATUS_OPTIONS: { label: string; value: LeaseStatus }[] = [
  { label: 'Active',    value: 'ACTIVE' },
  { label: 'Expired',   value: 'EXPIRED' },
  { label: 'Pending',   value: 'PENDING' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export const LEASE_MIN_DURATION_MONTHS = 1;
export const LEASE_MAX_DURATION_MONTHS = 36;
