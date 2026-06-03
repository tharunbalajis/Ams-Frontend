import type { PetType, VaccinationStatus } from '../types/pet.types';

export const PET_TYPE_OPTIONS: { label: string; value: PetType }[] = [
  { label: 'Dog',    value: 'DOG' },
  { label: 'Cat',    value: 'CAT' },
  { label: 'Bird',   value: 'BIRD' },
  { label: 'Rabbit', value: 'RABBIT' },
  { label: 'Fish',   value: 'FISH' },
  { label: 'Other',  value: 'OTHER' },
];

export const VACCINATION_STATUS_OPTIONS: { label: string; value: VaccinationStatus }[] = [
  { label: 'Vaccinated',     value: 'VACCINATED' },
  { label: 'Not Vaccinated', value: 'NOT_VACCINATED' },
  { label: 'Expired',        value: 'EXPIRED' },
];
