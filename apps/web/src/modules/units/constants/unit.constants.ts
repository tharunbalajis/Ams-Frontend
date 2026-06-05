import type { UnitType, OccupancyStatus } from '../types/unit.types';

export const UNIT_TYPE_OPTIONS: { label: string; value: UnitType }[] = [
  { label: 'Studio',     value: 'STUDIO' },
  { label: '1 BHK',      value: '1BHK' },
  { label: '2 BHK',      value: '2BHK' },
  { label: '3 BHK',      value: '3BHK' },
  { label: '4 BHK',      value: '4BHK' },
  { label: 'Commercial', value: 'COMMERCIAL' },
];

export const OCCUPANCY_STATUS_OPTIONS: { label: string; value: OccupancyStatus }[] = [
  { label: 'Vacant',         value: 'VACANT' },
  { label: 'Owner Occupied', value: 'OWNER_OCCUPIED' },
  { label: 'Rented',         value: 'RENTED' },
];

export const UNIT_ROUTES = {
  LIST:   '/units',
  CREATE: '/units/create',
  DETAIL: '/units/:id',
  EDIT:   '/units/:id/edit',
} as const;

export const UNIT_PAGE_SIZE = 20;
