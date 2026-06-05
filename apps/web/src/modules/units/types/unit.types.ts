export type UnitType      = 'STUDIO' | '1BHK' | '2BHK' | '3BHK';
export type OwnershipType = 'OWNED' | 'RENTED' | 'VACANT';

export interface Unit {
  unit_id:       number;   // PK — not 'id'
  society_id:    number;
  block_id?:     number;
  unit_number:   string;
  floor_number?: number;
  unit_type:     UnitType;
  ownership_type: OwnershipType;
  is_active:     boolean;
  super_built_up?: number;
  carpet_area?:  number;
  is_commercial: boolean;
  parking_slots: number;
  created_at:    string;
  updated_at:    string;
  // joined fields (may be present)
  block_name?:   string;
}

export type UnitListItem = Unit;

export interface CreateUnitPayload {
  society_id:    number;
  unit_number:   string;
  unit_type:     UnitType;
  block_id?:     number;
  floor_number?: number;
  ownership_type?: OwnershipType;
  super_built_up?: number;
  carpet_area?:  number;
  parking_slots?: number;
}

export type UpdateUnitPayload = Partial<CreateUnitPayload>;

export interface UnitFiltersParams {
  society_id?:    number;
  block_id?:      number;
  unit_type?:     UnitType;
  ownership_type?: OwnershipType;
  is_active?:     boolean;
  search?:        string;
  page?:          number;
  limit?:         number;
}
