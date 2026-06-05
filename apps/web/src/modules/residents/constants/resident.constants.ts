import type { ResidentType, ResidentRelationship } from '../types/resident.types';

export const RESIDENT_TYPE_OPTIONS: { label: string; value: ResidentType }[] = [
  { label: 'Owner',  value: 'OWNER' },
  { label: 'Tenant', value: 'TENANT' },
  { label: 'Family', value: 'FAMILY' },
];

export const RESIDENT_RELATIONSHIP_OPTIONS: { label: string; value: ResidentRelationship }[] = [
  { label: 'Primary',   value: 'PRIMARY' },
  { label: 'Spouse',    value: 'SPOUSE' },
  { label: 'Child',     value: 'CHILD' },
  { label: 'Parent',    value: 'PARENT' },
  { label: 'Dependent', value: 'DEPENDENT' },
];

export const RESIDENT_ROUTES = {
  LIST:    '/residents',
  CREATE:  '/residents/create',
  DETAIL:  '/residents/:id',
  EDIT:    '/residents/:id/edit',
  PROFILE: '/residents/:id/profile',
} as const;

export const RESIDENT_PAGE_SIZE = 20;
