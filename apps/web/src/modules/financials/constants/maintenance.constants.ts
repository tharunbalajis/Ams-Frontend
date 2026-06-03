import type { HeadType, Frequency, CalculationBasis } from '../types/maintenance.types';

export const MAINTENANCE_HEAD_TYPE_OPTIONS: { label: string; value: HeadType }[] = [
  { label: 'Maintenance',  value: 'MAINTENANCE' },
  { label: 'Utilities',    value: 'UTILITIES' },
  { label: 'Security',     value: 'SECURITY' },
  { label: 'Housekeeping', value: 'HOUSEKEEPING' },
  { label: 'Admin',        value: 'ADMIN' },
  { label: 'Other',        value: 'OTHER' },
];

export const FREQUENCY_OPTIONS: { label: string; value: Frequency }[] = [
  { label: 'Monthly',     value: 'MONTHLY' },
  { label: 'Quarterly',   value: 'QUARTERLY' },
  { label: 'Half Yearly', value: 'HALF_YEARLY' },
  { label: 'Yearly',      value: 'YEARLY' },
  { label: 'One Time',    value: 'ONE_TIME' },
];

export const CALCULATION_BASIS_OPTIONS: { label: string; value: CalculationBasis }[] = [
  { label: 'Per Unit',    value: 'PER_UNIT' },
  { label: 'Per Sq. Ft.', value: 'PER_SQ_FT' },
  { label: 'Fixed',       value: 'FIXED' },
  { label: 'Percentage',  value: 'PERCENTAGE' },
];

export const LATE_FEE_PERCENTAGE = 2;
export const LATE_FEE_GRACE_DAYS = 7;
