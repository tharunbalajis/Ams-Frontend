import type { ID, Timestamp } from '@/types/common.types';
import type { OwnershipType } from './unit.types';

export interface OwnerInfo {
  residentId: ID;
  name:       string;
  email:      string;
  phone:      string;
}

export interface Ownership {
  id:            ID;
  unitId:        ID;
  ownershipType: OwnershipType;
  owner:         OwnerInfo;
  tenant?:       OwnerInfo;
  startDate:     string;
  endDate?:      string;
  isActive:      boolean;
  createdAt:     Timestamp;
  updatedAt:     Timestamp;
}

export interface CreateOwnershipPayload {
  unitId:        ID;
  ownershipType: OwnershipType;
  ownerId:       ID;
  tenantId?:     ID;
  startDate:     string;
  endDate?:      string;
}

export type UpdateOwnershipPayload = Partial<Omit<CreateOwnershipPayload, 'unitId'>>;

export interface OwnershipHistory {
  unitId:  ID;
  records: Ownership[];
}
