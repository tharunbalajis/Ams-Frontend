import type { UnitType, UnitStatus, OwnershipType } from '../types/unit.types';

export const UNIT_TYPE_OPTIONS: { label: string; value: UnitType }[] = [
  { label: 'Studio',      value: 'studio' },
  { label: '1 BHK',       value: '1bhk' },
  { label: '2 BHK',       value: '2bhk' },
  { label: '3 BHK',       value: '3bhk' },
  { label: '4 BHK',       value: '4bhk' },
  { label: 'Penthouse',   value: 'penthouse' },
  { label: 'Commercial',  value: 'commercial' },
];

export const UNIT_STATUS_OPTIONS: { label: string; value: UnitStatus }[] = [
  { label: 'Active',            value: 'active' },
  { label: 'Inactive',          value: 'inactive' },
  { label: 'Under Maintenance', value: 'under_maintenance' },
];

export const OWNERSHIP_TYPE_OPTIONS: { label: string; value: OwnershipType }[] = [
  { label: 'Owned',  value: 'owned' },
  { label: 'Rented', value: 'rented' },
  { label: 'Leased', value: 'leased' },
];

export const UNIT_ROUTES = {
  LIST:      '/units',
  CREATE:    '/units/create',
  DETAIL:    '/units/:id',
  EDIT:      '/units/:id/edit',
  OCCUPANCY: '/units/:id/occupancy',
} as const;

export const UNIT_PAGE_SIZE = 20;
