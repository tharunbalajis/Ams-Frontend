import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type LeaseStatus = 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'CANCELLED';

export interface Lease {
  id:            ID;
  residentId:    ID;
  unitId:        ID;
  startDate:     string;
  endDate:       string;
  monthlyRent:   number;
  depositAmount: number;
  agreementUrl?: Nullable<string>;
  status:        LeaseStatus;
  createdAt:     Timestamp;
  updatedAt:     Timestamp;
}

export interface CreateLeasePayload {
  residentId:    ID;
  unitId:        ID;
  startDate:     string;
  endDate:       string;
  monthlyRent:   number;
  depositAmount: number;
}

export type UpdateLeasePayload = Partial<Omit<CreateLeasePayload, 'residentId' | 'unitId'>>;
