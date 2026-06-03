import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type VisitorType =
  | 'GUEST'
  | 'DELIVERY'
  | 'SERVICE_PROVIDER'
  | 'VENDOR'
  | 'MAINTENANCE'
  | 'EMERGENCY';

export type VisitorStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'BLACKLISTED';
export type EntryStatus   = 'CHECKED_IN' | 'CHECKED_OUT' | 'EXPECTED' | 'OVERSTAY' | 'NO_SHOW';

export interface Visitor {
  id:                ID;
  name:              string;
  mobile:            string;
  type:              VisitorType;
  status:            VisitorStatus;
  entryStatus:       EntryStatus;
  purposeOfVisit:    string;
  residentId:        ID;
  residentName:      string;
  unitNumber:        string;
  vehicleNumber:     Nullable<string>;
  idProof:           Nullable<string>;
  expectedEntryTime: string;
  expectedExitTime:  Nullable<string>;
  actualEntryTime:   Nullable<string>;
  actualExitTime:    Nullable<string>;
  gateNumber:        Nullable<string>;
  securityNotes:     Nullable<string>;
  isPreApproved:     boolean;
  createdAt:         Timestamp;
  updatedAt:         Timestamp;
}

export type VisitorListItem = Pick<
  Visitor,
  | 'id'
  | 'name'
  | 'mobile'
  | 'type'
  | 'status'
  | 'entryStatus'
  | 'purposeOfVisit'
  | 'residentName'
  | 'unitNumber'
  | 'expectedEntryTime'
  | 'actualEntryTime'
  | 'actualExitTime'
  | 'isPreApproved'
>;

export interface CreateVisitorPayload {
  name:              string;
  mobile:            string;
  type:              VisitorType;
  purposeOfVisit:    string;
  residentId:        ID;
  vehicleNumber?:    string;
  idProof?:          string;
  expectedEntryTime: string;
  expectedExitTime?: string;
}

export type UpdateVisitorPayload = Partial<CreateVisitorPayload>;

export interface VisitorFiltersParams {
  search?:      string;
  type?:        VisitorType;
  status?:      VisitorStatus;
  entryStatus?: EntryStatus;
  residentId?:  ID;
  unitNumber?:  string;
  dateFrom?:    string;
  dateTo?:      string;
  page?:        number;
  limit?:       number;
  sortBy?:      string;
  sortDir?:     'asc' | 'desc';
}
