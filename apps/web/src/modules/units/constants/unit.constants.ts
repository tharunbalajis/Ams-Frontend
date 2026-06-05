import type { UnitType, OwnershipType } from '../types/unit.types';

export const UNIT_TYPE_OPTIONS: { label: string; value: UnitType }[] = [
  { label: 'Studio', value: 'STUDIO' },
  { label: '1 BHK',  value: '1BHK' },
  { label: '2 BHK',  value: '2BHK' },
  { label: '3 BHK',  value: '3BHK' },
];

export const OWNERSHIP_TYPE_OPTIONS: { label: string; value: OwnershipType }[] = [
  { label: 'Owned',  value: 'OWNED' },
  { label: 'Rented', value: 'RENTED' },
  { label: 'Vacant', value: 'VACANT' },
];

export const UNIT_ROUTES = {
  LIST:   '/units',
  CREATE: '/units/create',
  DETAIL: '/units/:id',
  EDIT:   '/units/:id/edit',
} as const;

export const UNIT_PAGE_SIZE = 20;
