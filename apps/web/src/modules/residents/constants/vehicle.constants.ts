import type { VehicleType } from '../types/vehicle.types';

export const VEHICLE_TYPE_OPTIONS: { label: string; value: VehicleType }[] = [
  { label: 'Car',        value: 'car' },
  { label: 'Motorcycle', value: 'motorcycle' },
  { label: 'Truck',      value: 'truck' },
  { label: 'Van',        value: 'van' },
  { label: 'Other',      value: 'other' },
];
