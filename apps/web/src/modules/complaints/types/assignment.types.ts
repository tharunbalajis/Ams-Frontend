import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type AssignmentStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export interface Assignment {
  id:                     ID;
  complaintId:            ID;
  assignedToId:           ID;
  assignedToName:         string;
  assignedToRole:         string;
  status:                 AssignmentStatus;
  assignedAt:             Timestamp;
  expectedResolutionDate: Nullable<string>;
  acceptedAt:             Nullable<Timestamp>;
  completedAt:            Nullable<Timestamp>;
  notes:                  Nullable<string>;
}

export interface CreateAssignmentPayload {
  complaintId:             ID;
  assignedToId:            ID;
  expectedResolutionDate?: string;
  notes?:                  string;
}

export type UpdateAssignmentPayload = Partial<Omit<CreateAssignmentPayload, 'complaintId'>>;
