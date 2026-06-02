import type { MaintenanceChargeType } from '../types/maintenance.types';

export const MAINTENANCE_CHARGE_TYPE_OPTIONS: { label: string; value: MaintenanceChargeType }[] = [
  { label: 'Monthly Maintenance', value: 'monthly' },
  { label: 'Special Assessment',  value: 'special_assessment' },
  { label: 'Late Fee',            value: 'late_fee' },
  { label: 'Penalty',             value: 'penalty' },
];

export const DEFAULT_MAINTENANCE_AMOUNT = 0;
export const LATE_FEE_PERCENTAGE        = 2;
export const LATE_FEE_GRACE_DAYS        = 7;
