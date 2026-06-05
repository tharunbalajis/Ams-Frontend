export type UnitType        = 'STUDIO' | '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'COMMERCIAL';
export type OccupancyStatus = 'VACANT' | 'OWNER_OCCUPIED' | 'RENTED';

export interface Unit {
  unit_id:          number;
  society_id:       number;
  block_id:         number;
  unit_number:      string;
  floor_number?:    number;
  unit_type:        UnitType;
  ownership_type?:  string;
  super_built_up?:  number;
  carpet_area?:     number;
  parking_slots?:   number;
  is_active:        boolean;
  occupancy_status: OccupancyStatus;
  occupant_count:   number;
  // joined fields
  block_name:       string;
  society_name:     string;
  owner_name?:      string | null;
  tenant_name?:     string | null;
}

export type UnitListItem = Unit;

export interface UnitDetail extends Unit {
  residents: {
    id:             string;
    full_name:      string;
    resident_type:  'OWNER' | 'TENANT';
    mobile_primary: string;
    email?:         string;
    move_in_date:   string;
    move_out_date?: string;
    is_active:      boolean;
  }[];
}

export interface UnitSummary {
  total_units:    number;
  vacant:         number;
  owner_occupied: number;
  rented:         number;
}

export interface CreateUnitPayload {
  society_id:    number;
  unit_number:   string;
  unit_type:     UnitType;
  block_id?:     number;
  floor_number?: number;
  super_built_up?: number;
  carpet_area?:  number;
  parking_slots?: number;
}

export type UpdateUnitPayload = Partial<CreateUnitPayload>;

export interface UnitFiltersParams {
  society_id?:       number;
  block_id?:         number;
  unit_type?:        UnitType;
  occupancy_status?: OccupancyStatus;
  is_active?:        boolean;
  search?:           string;
  limit?:            number;
  offset?:           number;
}
