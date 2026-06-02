import type { ID, Timestamp } from '@/types/common.types';

export type LeaseStatus = 'active' | 'expired' | 'pending' | 'cancelled';

export interface Lease {
  id:            ID;
  residentId:    ID;
  unitId:        ID;
  startDate:     string;
  endDate:       string;
  monthlyRent:   number;
  depositAmount: number;
  agreementUrl?: string;
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
