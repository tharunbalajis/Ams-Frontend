import type { ID, Timestamp } from '@/types/common.types';

export type HeadType         = 'MAINTENANCE' | 'UTILITIES' | 'SECURITY' | 'HOUSEKEEPING' | 'ADMIN' | 'OTHER';
export type Frequency        = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY' | 'ONE_TIME';
export type CalculationBasis = 'PER_UNIT' | 'PER_SQ_FT' | 'FIXED' | 'PERCENTAGE';

export interface MaintenanceHead {
  id:               ID;
  name:             string;
  code:             string;
  headType:         HeadType;
  frequency:        Frequency;
  calculationBasis: CalculationBasis;
  defaultAmount:    number;
  isActive:         boolean;
  description:      string;
  createdAt:        Timestamp;
  updatedAt:        Timestamp;
}

export interface CreateMaintenanceHeadPayload {
  name:             string;
  code:             string;
  headType:         HeadType;
  frequency:        Frequency;
  calculationBasis: CalculationBasis;
  defaultAmount:    number;
  description?:     string;
}

export type UpdateMaintenanceHeadPayload = Partial<CreateMaintenanceHeadPayload>;

export interface GenerateInvoicesPayload {
  headId:  ID;
  period:  string;
  dueDate: string;
}
