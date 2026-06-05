export type ResidentType        = 'OWNER' | 'TENANT' | 'FAMILY';
export type ResidentRelationship = 'PRIMARY' | 'SPOUSE' | 'CHILD' | 'PARENT' | 'DEPENDENT';

export interface Resident {
  id:               string;
  society_id:       number;
  unit_id:          number;
  full_name:        string;
  relationship:     ResidentRelationship;
  resident_type:    ResidentType;
  mobile_primary:   string;
  mobile_secondary?: string;
  email?:           string;
  move_in_date:     string;
  move_out_date?:   string;
  is_active:        boolean;
  created_at:       string;
  updated_at:       string;
}

export type ResidentListItem = Resident;

export interface CreateResidentPayload {
  society_id:    number;
  unit_id:       number;
  full_name:     string;
  mobile_primary: string;
  move_in_date:  string;
  relationship?: ResidentRelationship;
  resident_type?: ResidentType;
  email?:        string;
  mobile_secondary?: string;
}

export type UpdateResidentPayload = Partial<CreateResidentPayload>;

export interface ResidentFiltersParams {
  society_id?: number;
  unit_id?:    number;
  is_active?:  boolean;
  search?:     string;
  page?:       number;
  limit?:      number;
}
