import type { AxiosResponse } from 'axios';
import { complaintsApi as globalApi } from '@/api/complaints.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Complaint,
  ComplaintListItem,
  CreateComplaintPayload,
  UpdateComplaintPayload,
  ComplaintFiltersParams,
  ComplaintStatus,
  ComplaintTimelineEvent,
} from '../types/complaint.types';

export const complaintsApi = {
  getAll: (params?: ComplaintFiltersParams): Promise<AxiosResponse<ApiListResponse<ComplaintListItem>>> =>
    globalApi.getAll(params) as Promise<AxiosResponse<ApiListResponse<ComplaintListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Complaint>>> =>
    globalApi.getById(id) as Promise<AxiosResponse<ApiResponse<Complaint>>>,

  create: (payload: CreateComplaintPayload): Promise<AxiosResponse<ApiResponse<Complaint>>> =>
    globalApi.create(payload) as Promise<AxiosResponse<ApiResponse<Complaint>>>,

  update: (id: string, payload: UpdateComplaintPayload): Promise<AxiosResponse<ApiResponse<Complaint>>> =>
    globalApi.update(id, payload) as Promise<AxiosResponse<ApiResponse<Complaint>>>,

  remove: (id: string): Promise<AxiosResponse<void>> =>
    globalApi.remove(id) as Promise<AxiosResponse<void>>,

  updateStatus: (id: string, status: ComplaintStatus, notes?: string): Promise<AxiosResponse<ApiResponse<Complaint>>> =>
    globalApi.updateStatus(id, { status, notes }) as Promise<AxiosResponse<ApiResponse<Complaint>>>,

  getTimeline: (id: string): Promise<AxiosResponse<ApiListResponse<ComplaintTimelineEvent>>> =>
    globalApi.getById(`${id}/timeline`) as Promise<AxiosResponse<ApiListResponse<ComplaintTimelineEvent>>>,
};
