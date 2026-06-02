import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type AssignmentStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';

export interface Assignment {
  id:                    ID;
  complaintId:           ID;
  assignedToId:          ID;
  assignedToName:        string;
  assignedToRole:        string;
  teamId:                Nullable<ID>;
  teamName:              Nullable<string>;
  status:                AssignmentStatus;
  assignedAt:            Timestamp;
  expectedResolutionDate: Nullable<string>;
  acceptedAt:            Nullable<Timestamp>;
  completedAt:           Nullable<Timestamp>;
  notes:                 Nullable<string>;
}

export interface CreateAssignmentPayload {
  complaintId:            ID;
  assignedToId:           ID;
  teamId?:                ID;
  expectedResolutionDate?: string;
  notes?:                 string;
}

export type UpdateAssignmentPayload = Partial<Omit<CreateAssignmentPayload, 'complaintId'>>;
