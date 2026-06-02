import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Assignment, CreateAssignmentPayload, UpdateAssignmentPayload } from '../types/assignment.types';

const base = (complaintId: ID) => `/complaints/${complaintId}/assignments`;

export const assignmentsApi = {
  getByComplaint: (complaintId: ID) =>
    apiClient.get<ApiListResponse<Assignment>>(base(complaintId)).then((r) => r.data),

  create: (complaintId: ID, payload: CreateAssignmentPayload) =>
    apiClient.post<ApiResponse<Assignment>>(base(complaintId), payload).then((r) => r.data),

  update: (complaintId: ID, assignmentId: ID, payload: UpdateAssignmentPayload) =>
    apiClient.patch<ApiResponse<Assignment>>(`${base(complaintId)}/${assignmentId}`, payload).then((r) => r.data),

  accept: (complaintId: ID, assignmentId: ID) =>
    apiClient.patch<ApiResponse<Assignment>>(`${base(complaintId)}/${assignmentId}/accept`).then((r) => r.data),

  complete: (complaintId: ID, assignmentId: ID) =>
    apiClient.patch<ApiResponse<Assignment>>(`${base(complaintId)}/${assignmentId}/complete`).then((r) => r.data),
};
