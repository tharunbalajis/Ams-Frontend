import type { ResidentType, ResidentStatus, ResidentGender } from '../types/resident.types';

export const RESIDENT_TYPE_OPTIONS: { label: string; value: ResidentType }[] = [
  { label: 'Owner',  value: 'OWNER' },
  { label: 'Tenant', value: 'TENANT' },
];

export const RESIDENT_STATUS_OPTIONS: { label: string; value: ResidentStatus }[] = [
  { label: 'Active',    value: 'ACTIVE' },
  { label: 'Inactive',  value: 'INACTIVE' },
  { label: 'Pending',   value: 'PENDING' },
  { label: 'Suspended', value: 'SUSPENDED' },
];

export const RESIDENT_GENDER_OPTIONS: { label: string; value: ResidentGender }[] = [
  { label: 'Male',   value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other',  value: 'OTHER' },
];

export const RESIDENT_ROUTES = {
  LIST:    '/residents',
  CREATE:  '/residents/create',
  DETAIL:  '/residents/:id',
  EDIT:    '/residents/:id/edit',
  PROFILE: '/residents/:id/profile',
} as const;

export const RESIDENT_PAGE_SIZE = 20;
