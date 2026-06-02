import type { ID, Timestamp } from '@/types/common.types';

export type VehicleType = 'car' | 'motorcycle' | 'truck' | 'van' | 'other';

export interface Vehicle {
  id:            ID;
  residentId:    ID;
  vehicleNumber: string;
  type:          VehicleType;
  brand:         string;
  model:         string;
  color?:        string;
  parkingSlot?:  string;
  createdAt:     Timestamp;
  updatedAt:     Timestamp;
}

export interface CreateVehiclePayload {
  residentId:    ID;
  vehicleNumber: string;
  type:          VehicleType;
  brand:         string;
  model:         string;
  color?:        string;
  parkingSlot?:  string;
}

export type UpdateVehiclePayload = Partial<Omit<CreateVehiclePayload, 'residentId'>>;
