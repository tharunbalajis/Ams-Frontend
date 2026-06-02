import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { SLA, SLAPolicy } from '../types/sla.types';

export const slaApi = {
  getByComplaint: (complaintId: ID) =>
    apiClient.get<ApiResponse<SLA>>(`/complaints/${complaintId}/sla`).then((r) => r.data),

  pauseSLA: (complaintId: ID) =>
    apiClient.patch<ApiResponse<SLA>>(`/complaints/${complaintId}/sla/pause`).then((r) => r.data),

  resumeSLA: (complaintId: ID) =>
    apiClient.patch<ApiResponse<SLA>>(`/complaints/${complaintId}/sla/resume`).then((r) => r.data),

  getPolicies: () =>
    apiClient.get<ApiResponse<SLAPolicy[]>>('/complaints/sla/policies').then((r) => r.data),
};
