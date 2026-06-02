import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Escalation, CreateEscalationPayload } from '../types/escalation.types';

const base = (complaintId: ID) => `/complaints/${complaintId}/escalations`;

export const escalationApi = {
  getByComplaint: (complaintId: ID) =>
    apiClient.get<ApiListResponse<Escalation>>(base(complaintId)).then((r) => r.data),

  create: (complaintId: ID, payload: CreateEscalationPayload) =>
    apiClient.post<ApiResponse<Escalation>>(base(complaintId), payload).then((r) => r.data),

  acknowledge: (complaintId: ID, escalationId: ID) =>
    apiClient.patch<ApiResponse<Escalation>>(`${base(complaintId)}/${escalationId}/acknowledge`).then((r) => r.data),

  resolve: (complaintId: ID, escalationId: ID, notes?: string) =>
    apiClient.patch<ApiResponse<Escalation>>(`${base(complaintId)}/${escalationId}/resolve`, { notes }).then((r) => r.data),
};
