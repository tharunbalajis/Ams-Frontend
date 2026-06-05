import type { HeadType, Frequency, CalculationBasis } from '../types/maintenance.types';

export const MAINTENANCE_HEAD_TYPE_OPTIONS: { label: string; value: HeadType }[] = [
  { label: 'Maintenance', value: 'MAINTENANCE' },
  { label: 'Utility',     value: 'UTILITY' },
  { label: 'Fund',        value: 'FUND' },
  { label: 'Other',       value: 'OTHER' },
];

export const FREQUENCY_OPTIONS: { label: string; value: Frequency }[] = [
  { label: 'Monthly',   value: 'MONTHLY' },
  { label: 'Quarterly', value: 'QUARTERLY' },
  { label: 'Annual',    value: 'ANNUAL' },
  { label: 'One Time',  value: 'ONE_TIME' },
];

export const CALCULATION_BASIS_OPTIONS: { label: string; value: CalculationBasis }[] = [
  { label: 'Flat',     value: 'FLAT' },
  { label: 'Per Sqft', value: 'PER_SQFT' },
  { label: 'Custom',   value: 'CUSTOM' },
];
