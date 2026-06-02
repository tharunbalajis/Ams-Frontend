import type { ResidentType, ResidentStatus, ResidentGender } from '../types/resident.types';

export const RESIDENT_TYPE_OPTIONS: { label: string; value: ResidentType }[] = [
  { label: 'Owner',  value: 'owner' },
  { label: 'Tenant', value: 'tenant' },
];

export const RESIDENT_STATUS_OPTIONS: { label: string; value: ResidentStatus }[] = [
  { label: 'Active',    value: 'active' },
  { label: 'Inactive',  value: 'inactive' },
  { label: 'Pending',   value: 'pending' },
  { label: 'Suspended', value: 'suspended' },
];

export const RESIDENT_GENDER_OPTIONS: { label: string; value: ResidentGender }[] = [
  { label: 'Male',   value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other',  value: 'other' },
];

export const RESIDENT_ROUTES = {
  LIST:    '/residents',
  CREATE:  '/residents/create',
  DETAIL:  '/residents/:id',
  EDIT:    '/residents/:id/edit',
  PROFILE: '/residents/:id/profile',
} as const;

export const RESIDENT_PAGE_SIZE = 20;
