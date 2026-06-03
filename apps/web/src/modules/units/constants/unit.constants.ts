import type { UnitType, UnitStatus, OwnershipType } from '../types/unit.types';

export const UNIT_TYPE_OPTIONS: { label: string; value: UnitType }[] = [
  { label: 'Studio',          value: 'STUDIO' },
  { label: '1 BHK',           value: '1BHK' },
  { label: '2 BHK',           value: '2BHK' },
  { label: '3 BHK',           value: '3BHK' },
  { label: '4 BHK',           value: '4BHK' },
  { label: 'Penthouse',       value: 'PENTHOUSE' },
  { label: 'Duplex',          value: 'DUPLEX' },
  { label: 'Commercial',      value: 'COMMERCIAL' },
];

export const UNIT_STATUS_OPTIONS: { label: string; value: UnitStatus }[] = [
  { label: 'Active',            value: 'ACTIVE' },
  { label: 'Inactive',          value: 'INACTIVE' },
  { label: 'Under Maintenance', value: 'UNDER_MAINTENANCE' },
];

export const OWNERSHIP_TYPE_OPTIONS: { label: string; value: OwnershipType }[] = [
  { label: 'Owned',  value: 'OWNED' },
  { label: 'Rented', value: 'RENTED' },
  { label: 'Leased', value: 'LEASED' },
];

export const UNIT_ROUTES = {
  LIST:   '/units',
  CREATE: '/units/create',
  DETAIL: '/units/:id',
  EDIT:   '/units/:id/edit',
} as const;

export const UNIT_PAGE_SIZE = 20;
