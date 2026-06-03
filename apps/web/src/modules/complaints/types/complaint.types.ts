import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type Priority        = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ComplaintStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'RESOLVED' | 'CLOSED';

export interface ComplaintCategory {
  id:   ID;
  name: string;
  code: string;
}

export interface ComplaintMedia {
  id:        ID;
  url:       string;
  mimeType:  string;
  fileName:  string;
  createdAt: Timestamp;
}

export interface Complaint {
  id:            ID;
  title:         string;
  categoryId:    ID;
  categoryName:  string;
  priority:      Priority;
  status:        ComplaintStatus;
  description:   string;
  residentId:    ID;
  residentName:  string;
  unitNumber:    string;
  media:         ComplaintMedia[];
  complaintDate: string;
  resolvedAt:    Nullable<Timestamp>;
  closedAt:      Nullable<Timestamp>;
  assignedTo:    Nullable<string>;
  createdAt:     Timestamp;
  updatedAt:     Timestamp;
}

export type ComplaintListItem = Pick<
  Complaint,
  | 'id'
  | 'title'
  | 'categoryName'
  | 'priority'
  | 'status'
  | 'residentName'
  | 'unitNumber'
  | 'assignedTo'
  | 'complaintDate'
  | 'resolvedAt'
>;

export interface CreateComplaintPayload {
  title:       string;
  categoryId:  ID;
  priority:    Priority;
  description: string;
  residentId:  ID;
}

export type UpdateComplaintPayload = Partial<CreateComplaintPayload & { status: ComplaintStatus }>;

export interface ComplaintFiltersParams {
  search?:    string;
  categoryId?: ID;
  priority?:  Priority;
  status?:    ComplaintStatus;
  assignedTo?: string;
  dateFrom?:  string;
  dateTo?:    string;
  page?:      number;
  limit?:     number;
  sortBy?:    string;
  sortDir?:   'asc' | 'desc';
}

export interface ComplaintTimelineEvent {
  id:          ID;
  complaintId: ID;
  event:       string;
  description: Nullable<string>;
  performedBy: string;
  timestamp:   Timestamp;
}
