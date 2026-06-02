import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type VisitorType =
  | 'guest'
  | 'delivery'
  | 'service_provider'
  | 'vendor'
  | 'maintenance'
  | 'emergency';

export type VisitorStatus  = 'pending' | 'approved' | 'rejected' | 'blacklisted';
export type EntryStatus    = 'checked_in' | 'checked_out' | 'expected' | 'overstay' | 'no_show';

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
  pageSize?:    number;
  sortBy?:      string;
  sortDir?:     'asc' | 'desc';
}

export interface PreApprovedVisitor {
  id:           ID;
  visitorName:  string;
  visitorMobile: string;
  residentId:   ID;
  residentName: string;
  unitNumber:   string;
  approvalDate: string;
  validUntil:   string;
  status:       'active' | 'expired' | 'revoked';
  createdAt:    Timestamp;
}
