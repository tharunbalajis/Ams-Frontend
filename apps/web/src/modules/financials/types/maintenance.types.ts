export type HeadType         = 'MAINTENANCE' | 'UTILITY' | 'FUND' | 'OTHER';
export type Frequency        = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONE_TIME';
export type CalculationBasis = 'FLAT' | 'PER_SQFT' | 'CUSTOM';

export interface MaintenanceHead {
  id:                string;
  society_id:        number;
  head_name:         string;
  head_type:         HeadType;
  calculation_basis: CalculationBasis;
  amount:            number;
  gst_applicable:    boolean;
  gst_rate:          number;
  frequency:         Frequency;
  is_active:         boolean;
  created_at:        string;
}

export interface CreateMaintenanceHeadPayload {
  head_name:         string;
  head_type:         HeadType;
  calculation_basis: CalculationBasis;
  amount:            number;
  frequency:         Frequency;
  gst_applicable?:   boolean;
  gst_rate?:         number;
}

export type UpdateMaintenanceHeadPayload = Partial<CreateMaintenanceHeadPayload>;
