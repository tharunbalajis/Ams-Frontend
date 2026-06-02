import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type ComplaintCategory =
  | 'maintenance'
  | 'electrical'
  | 'plumbing'
  | 'security'
  | 'housekeeping'
  | 'parking'
  | 'noise'
  | 'amenities'
  | 'other';

export type ComplaintType   = 'general' | 'urgent' | 'repeat' | 'anonymous';
export type Priority        = 'low' | 'medium' | 'high' | 'critical';
export type ComplaintStatus =
  | 'open'
  | 'assigned'
  | 'in_progress'
  | 'on_hold'
  | 'resolved'
  | 'closed'
  | 'escalated';

export interface Complaint {
  id:              ID;
  title:           string;
  category:        ComplaintCategory;
  type:            ComplaintType;
  priority:        Priority;
  status:          ComplaintStatus;
  description:     string;
  residentId:      ID;
  residentName:    string;
  unitNumber:      string;
  attachments:     string[];
  complaintDate:   string;
  expectedBy:      Nullable<string>;
  resolvedAt:      Nullable<Timestamp>;
  closedAt:        Nullable<Timestamp>;
  assignedTo:      Nullable<string>;
  slaBreached:     boolean;
  escalationLevel: number;
  tags:            string[];
  createdAt:       Timestamp;
  updatedAt:       Timestamp;
}

export type ComplaintListItem = Pick<
  Complaint,
  | 'id'
  | 'title'
  | 'category'
  | 'priority'
  | 'status'
  | 'residentName'
  | 'unitNumber'
  | 'assignedTo'
  | 'slaBreached'
  | 'complaintDate'
  | 'resolvedAt'
  | 'escalationLevel'
>;

export interface CreateComplaintPayload {
  title:         string;
  category:      ComplaintCategory;
  type:          ComplaintType;
  priority:      Priority;
  description:   string;
  residentId:    ID;
  complaintDate: string;
  attachments?:  string[];
  tags?:         string[];
}

export type UpdateComplaintPayload = Partial<CreateComplaintPayload & { status: ComplaintStatus }>;

export interface ComplaintFiltersParams {
  search?:       string;
  category?:     ComplaintCategory;
  priority?:     Priority;
  status?:       ComplaintStatus;
  slaBreached?:  boolean;
  assignedTo?:   string;
  dateFrom?:     string;
  dateTo?:       string;
  page?:         number;
  pageSize?:     number;
  sortBy?:       string;
  sortDir?:      'asc' | 'desc';
}

export interface ComplaintTimelineEvent {
  id:          ID;
  complaintId: ID;
  event:       string;
  description: Nullable<string>;
  performedBy: string;
  timestamp:   Timestamp;
}
