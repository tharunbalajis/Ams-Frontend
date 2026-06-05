import type { ResidentType } from '../types/resident.types';

export const RESIDENT_TYPE_OPTIONS: { label: string; value: ResidentType }[] = [
  { label: 'Owner',  value: 'OWNER' },
  { label: 'Tenant', value: 'TENANT' },
];

export const RESIDENT_ROUTES = {
  LIST:    '/residents',
  CREATE:  '/residents/create',
  DETAIL:  '/residents/:id',
  EDIT:    '/residents/:id/edit',
  PROFILE: '/residents/:id/profile',
} as const;

export const RESIDENT_PAGE_SIZE = 20;
