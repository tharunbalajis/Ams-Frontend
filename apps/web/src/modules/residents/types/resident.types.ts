import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type ResidentType   = 'OWNER' | 'TENANT';
export type ResidentStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';
export type ResidentGender = 'MALE' | 'FEMALE' | 'OTHER';

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
  emergencyContact: Nullable<EmergencyContact>;
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
  unitId:           ID;
  dateOfBirth?:     string;
  gender?:          ResidentGender;
  emergencyContact?: EmergencyContact;
}

export type UpdateResidentPayload = Partial<CreateResidentPayload>;

export interface ResidentFiltersParams {
  search?:   string;
  type?:     ResidentType;
  status?:   ResidentStatus;
  unitId?:   ID;
  page?:     number;
  limit?:    number;
  sortBy?:   string;
  sortDir?:  'asc' | 'desc';
}
