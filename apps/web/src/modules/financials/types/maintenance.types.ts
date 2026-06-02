import type { ID, Timestamp } from '@/types/common.types';

export type MaintenanceChargeType = 'monthly' | 'special_assessment' | 'late_fee' | 'penalty';

export interface MaintenanceCharge {
  id:            ID;
  type:          MaintenanceChargeType;
  residentId:    ID;
  residentName:  string;
  unitNumber:    string;
  amount:        number;
  period:        string;
  dueDate:       string;
  description:   string;
  isGenerated:   boolean;
  generatedAt:   Timestamp;
}

export interface GenerateMaintenancePayload {
  period:     string;
  dueDate:    string;
  chargeType: MaintenanceChargeType;
  amount?:    number;
}
