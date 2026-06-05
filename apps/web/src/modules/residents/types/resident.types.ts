export type ResidentType = 'OWNER' | 'TENANT';

export interface Resident {
  id:             string;
  society_id:     number;
  unit_id:        number;
  full_name:      string;
  resident_type:  ResidentType;
  mobile_primary: string;
  email?:         string;
  move_in_date:   string;
  move_out_date?: string;
  is_active:      boolean;
  created_at:     string;
  updated_at:     string;
  // joined fields
  unit_number:    string;
  unit_type:      string;
  block_name:     string;
  society_name:   string;
}

export type ResidentListItem = Resident;

export interface ResidentSummary {
  total_active:  number;
  total_owners:  number;
  total_tenants: number;
}

export interface CreateResidentPayload {
  society_id:     number;
  unit_id:        number;
  full_name:      string;
  mobile_primary: string;
  resident_type:  ResidentType;
  move_in_date:   string;
  move_out_date?: string;
  email?:         string;
}

export type UpdateResidentPayload = Partial<CreateResidentPayload>;

export interface ResidentFiltersParams {
  society_id?:    number;
  unit_id?:       number;
  resident_type?: ResidentType;
  is_active?:     boolean;
  search?:        string;
  limit?:         number;
  offset?:        number;
}
