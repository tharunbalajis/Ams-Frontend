import type { ID, Timestamp } from '@/types/common.types';

export type PetType           = 'DOG' | 'CAT' | 'BIRD' | 'RABBIT' | 'FISH' | 'OTHER';
export type VaccinationStatus = 'VACCINATED' | 'NOT_VACCINATED' | 'EXPIRED';

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
