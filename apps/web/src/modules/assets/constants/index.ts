import type { AssetStatus } from '@/api/assets.api';

export const ASSET_STATUS_OPTIONS: { label: string; value: AssetStatus }[] = [
  { label: 'Operational',        value: 'operational' },
  { label: 'Under Maintenance',  value: 'under_maintenance' },
  { label: 'Retired',            value: 'retired' },
];

export const ASSET_TYPE_OPTIONS = [
  { label: 'Elevator',       value: 'Elevator' },
  { label: 'Generator',      value: 'Generator' },
  { label: 'Water Pump',     value: 'Water Pump' },
  { label: 'CCTV',           value: 'CCTV' },
  { label: 'Fire Safety',    value: 'Fire Safety' },
  { label: 'Gym Equipment',  value: 'Gym Equipment' },
  { label: 'Other',          value: 'Other' },
];
