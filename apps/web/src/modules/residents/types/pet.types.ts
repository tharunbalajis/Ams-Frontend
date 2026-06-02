import type { ID, Timestamp } from '@/types/common.types';

export type PetType          = 'dog' | 'cat' | 'bird' | 'other';
export type VaccinationStatus = 'vaccinated' | 'not_vaccinated' | 'expired';

export interface Pet {
  id:                ID;
  residentId:        ID;
  name:              string;
  type:              PetType;
  breed:             string;
  vaccinationStatus: VaccinationStatus;
  vaccineExpiry?:    string;
  createdAt:         Timestamp;
  updatedAt:         Timestamp;
}

export interface CreatePetPayload {
  residentId:        ID;
  name:              string;
  type:              PetType;
  breed:             string;
  vaccinationStatus: VaccinationStatus;
  vaccineExpiry?:    string;
}

export type UpdatePetPayload = Partial<Omit<CreatePetPayload, 'residentId'>>;
