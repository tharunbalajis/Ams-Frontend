import type { VehicleType } from '../types/vehicle.types';

export const VEHICLE_TYPE_OPTIONS: { label: string; value: VehicleType }[] = [
  { label: 'Car',        value: 'CAR' },
  { label: 'Motorcycle', value: 'MOTORCYCLE' },
  { label: 'Scooter',    value: 'SCOOTER' },
  { label: 'Truck',      value: 'TRUCK' },
  { label: 'Van',        value: 'VAN' },
  { label: 'Bicycle',    value: 'BICYCLE' },
  { label: 'Other',      value: 'OTHER' },
];
