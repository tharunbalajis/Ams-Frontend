import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type UnitType        = 'STUDIO' | '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'PENTHOUSE' | 'DUPLEX' | 'COMMERCIAL';
export type UnitStatus      = 'ACTIVE' | 'INACTIVE' | 'UNDER_MAINTENANCE';
export type OccupancyStatus = 'OCCUPIED' | 'VACANT' | 'RESERVED' | 'UNDER_MAINTENANCE';
export type OwnershipType   = 'OWNED' | 'RENTED' | 'LEASED';

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
  search?:          string;
  block?:           string;
  floor?:           number;
  type?:            UnitType;
  status?:          UnitStatus;
  occupancyStatus?: OccupancyStatus;
  ownershipType?:   OwnershipType;
  page?:            number;
  limit?:           number;
  sortBy?:          string;
  sortDir?:         'asc' | 'desc';
}
