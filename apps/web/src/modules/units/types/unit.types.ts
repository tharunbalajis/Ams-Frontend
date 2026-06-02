import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type UnitType        = 'studio' | '1bhk' | '2bhk' | '3bhk' | '4bhk' | 'penthouse' | 'commercial';
export type UnitStatus      = 'active' | 'inactive' | 'under_maintenance';
export type OccupancyStatus = 'occupied' | 'vacant' | 'reserved' | 'under_maintenance';
export type OwnershipType   = 'owned' | 'rented' | 'leased';

export interface Unit {
  id:              ID;
  unitNumber:      string;
  block:           string;
  floor:           number;
  type:            UnitType;
  squareFeet:      number;
  ownershipType:   OwnershipType;
  occupancyStatus: OccupancyStatus;
  status:          UnitStatus;
  residentCount:   number;
  description:     Nullable<string>;
  createdAt:       Timestamp;
  updatedAt:       Timestamp;
}

export type UnitListItem = Pick<
  Unit,
  'id' | 'unitNumber' | 'block' | 'floor' | 'type' | 'squareFeet' | 'ownershipType' | 'occupancyStatus' | 'status' | 'residentCount'
>;

export interface CreateUnitPayload {
  unitNumber:    string;
  block:         string;
  floor:         number;
  type:          UnitType;
  squareFeet:    number;
  ownershipType: OwnershipType;
  description?:  string;
}

export type UpdateUnitPayload = Partial<CreateUnitPayload>;

export interface UnitFiltersParams {
  search?:         string;
  block?:          string;
  floor?:          number;
  type?:           UnitType;
  status?:         UnitStatus;
  occupancyStatus?: OccupancyStatus;
  ownershipType?:  OwnershipType;
  page?:           number;
  pageSize?:       number;
  sortBy?:         string;
  sortDir?:        'asc' | 'desc';
}
