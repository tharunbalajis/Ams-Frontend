export type VisitorType =
  | 'GUEST'
  | 'DELIVERY'
  | 'DOMESTIC_HELP'
  | 'SERVICE'
  | 'CONTRACTOR'
  | 'BROKER'
  | 'UNKNOWN';

export interface Visitor {
  id:             string;
  society_id:     number;
  unit_id:        number;
  resident_id:    string;
  visitor_name:   string;   // NOT full_name
  visitor_mobile?: string;  // NOT mobile
  visitor_type:   VisitorType;
  purpose?:       string;
  check_in_at?:   string;   // NOT check_in_time
  check_out_at?:  string;
  status:         string;
  is_active:      boolean;
  created_at:     string;
}

export type VisitorListItem = Visitor;

export interface CreateVisitorPayload {
  visitor_name:   string;
  visitor_type:   VisitorType;
  society_id?:    number;
  unit_id?:       number;
  resident_id?:   string;
  purpose?:       string;
  visitor_mobile?: string;
}

export type UpdateVisitorPayload = Partial<CreateVisitorPayload>;

export interface VisitorFiltersParams {
  society_id?: number;
  status?:     string;
  search?:     string;
  page?:       number;
  limit?:      number;
}
