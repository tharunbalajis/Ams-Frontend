import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Assignment, CreateAssignmentPayload, UpdateAssignmentPayload } from '../types/assignment.types';

const base = (complaintId: ID) => `/complaints/${complaintId}/assignments`;

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const assignmentsApi = {
  getByComplaint: (complaintId: ID) =>
    apiClient.get<Assignment[]>(base(complaintId)).then((r) => wrapArray(r.data)),

  create: (complaintId: ID, payload: CreateAssignmentPayload) =>
    apiClient.post<Assignment>(base(complaintId), payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Assignment>),

  update: (complaintId: ID, assignmentId: ID, payload: UpdateAssignmentPayload) =>
    apiClient.put<Assignment>(`${base(complaintId)}/${assignmentId}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Assignment>),

  accept: (complaintId: ID, assignmentId: ID) =>
    apiClient.put<Assignment>(`${base(complaintId)}/${assignmentId}/accept`, {}).then((r) => ({ data: r.data, success: true }) as ApiResponse<Assignment>),

  complete: (complaintId: ID, assignmentId: ID) =>
    apiClient.put<Assignment>(`${base(complaintId)}/${assignmentId}/complete`, {}).then((r) => ({ data: r.data, success: true }) as ApiResponse<Assignment>),
};
