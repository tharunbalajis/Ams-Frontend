export type Priority        = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface ComplaintCategory {
  id:                string;
  society_id:        number;
  category_name:     string;
  sla_hours:         number;
  escalation_hours:  number;
  is_active:         boolean;
  created_at:        string;
}

export interface Complaint {
  id:           string;
  society_id:   number;
  unit_id:      number;
  resident_id:  string;
  raised_by:    string;
  cat_id:       string;     // FK to complaint_categories — NOT category_id
  ticket_number?: string;
  title:        string;
  description:  string;
  priority:     Priority;
  status:       ComplaintStatus;
  assigned_to?: string;
  sla_breach:   boolean;
  is_active:    boolean;
  created_at:   string;
  updated_at:   string;
  // possible joined fields
  category_name?: string;
}

export type ComplaintListItem = Complaint;

export interface CreateComplaintPayload {
  society_id:  number;
  unit_id:     number;
  raised_by:   string;   // UUID of logged-in user — required
  cat_id:      string;   // NOT category_id
  title:       string;
  description: string;
  priority?:   Priority;
}

export type UpdateComplaintPayload = Partial<CreateComplaintPayload & { status: ComplaintStatus }>;

export interface ComplaintFiltersParams {
  society_id?: number;
  status?:     ComplaintStatus;
  priority?:   Priority;
  cat_id?:     string;
  search?:     string;
  page?:       number;
  limit?:      number;
}

export interface ComplaintTimelineEvent {
  id:          string;
  complaint_id: string;
  event:       string;
  description?: string;
  performed_by: string;
  timestamp:   string;
}
