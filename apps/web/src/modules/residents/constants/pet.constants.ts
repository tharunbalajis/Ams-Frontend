import type { PetType, VaccinationStatus } from '../types/pet.types';

export const PET_TYPE_OPTIONS: { label: string; value: PetType }[] = [
  { label: 'Dog',   value: 'dog' },
  { label: 'Cat',   value: 'cat' },
  { label: 'Bird',  value: 'bird' },
  { label: 'Other', value: 'other' },
];

export const VACCINATION_STATUS_OPTIONS: { label: string; value: VaccinationStatus }[] = [
  { label: 'Vaccinated',     value: 'vaccinated' },
  { label: 'Not Vaccinated', value: 'not_vaccinated' },
  { label: 'Expired',        value: 'expired' },
];
