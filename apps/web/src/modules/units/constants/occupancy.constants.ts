import type { OccupancyStatus } from '../types/unit.types';

export const OCCUPANCY_STATUS_OPTIONS: { label: string; value: OccupancyStatus }[] = [
  { label: 'Occupied',          value: 'occupied' },
  { label: 'Vacant',            value: 'vacant' },
  { label: 'Reserved',          value: 'reserved' },
  { label: 'Under Maintenance', value: 'under_maintenance' },
];

export const OCCUPANCY_STATUS_COLOR: Record<OccupancyStatus, string> = {
  occupied:          'success',
  vacant:            'secondary',
  reserved:          'warning',
  under_maintenance: 'destructive',
};
