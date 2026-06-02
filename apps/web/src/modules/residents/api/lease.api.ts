import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Lease, CreateLeasePayload, UpdateLeasePayload } from '../types/lease.types';

const base = (residentId: ID) => `/residents/${residentId}/leases`;

export const leaseApi = {
  getByResident: (residentId: ID) =>
    apiClient.get<ApiListResponse<Lease>>(base(residentId)).then((r) => r.data),

  getActive: (residentId: ID) =>
    apiClient.get<ApiResponse<Lease>>(`${base(residentId)}/active`).then((r) => r.data),

  create: (residentId: ID, payload: CreateLeasePayload) =>
    apiClient.post<ApiResponse<Lease>>(base(residentId), payload).then((r) => r.data),

  update: (residentId: ID, leaseId: ID, payload: UpdateLeasePayload) =>
    apiClient.patch<ApiResponse<Lease>>(`${base(residentId)}/${leaseId}`, payload).then((r) => r.data),

  uploadAgreement: (residentId: ID, leaseId: ID, file: File) => {
    const form = new FormData();
    form.append('agreement', file);
    return apiClient.post<ApiResponse<{ url: string }>>(`${base(residentId)}/${leaseId}/agreement`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },
};
