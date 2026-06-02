import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type ResidentType   = 'owner' | 'tenant';
export type ResidentStatus = 'active' | 'inactive' | 'pending' | 'suspended';
export type ResidentGender = 'male' | 'female' | 'other';

export interface EmergencyContact {
  name:         string;
  relationship: string;
  phone:        string;
  email?:       string;
}

export interface Resident {
  id:               ID;
  type:             ResidentType;
  firstName:        string;
  lastName:         string;
  fullName:         string;
  email:            string;
  phone:            string;
  dateOfBirth:      Nullable<string>;
  gender:           Nullable<ResidentGender>;
  profileImage:     Nullable<string>;
  unitId:           ID;
  unitNumber:       string;
  status:           ResidentStatus;
  emergencyContact: EmergencyContact;
  idProof:          Nullable<string>;
  createdAt:        Timestamp;
  updatedAt:        Timestamp;
}

export type ResidentListItem = Pick<
  Resident,
  'id' | 'fullName' | 'email' | 'phone' | 'unitNumber' | 'type' | 'status' | 'createdAt'
>;

export interface CreateResidentPayload {
  type:             ResidentType;
  firstName:        string;
  lastName:         string;
  email:            string;
  phone:            string;
  dateOfBirth?:     string;
  gender?:          ResidentGender;
  unitId:           ID;
  emergencyContact: EmergencyContact;
}

export type UpdateResidentPayload = Partial<CreateResidentPayload>;

export interface ResidentFiltersParams {
  search?:   string;
  type?:     ResidentType;
  status?:   ResidentStatus;
  unitId?:   ID;
  page?:     number;
  pageSize?: number;
  sortBy?:   string;
  sortDir?:  'asc' | 'desc';
}
