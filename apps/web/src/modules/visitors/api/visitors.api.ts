import type { AxiosResponse } from 'axios';
import { visitorsApi as globalApi } from '@/api/visitors.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Visitor,
  VisitorListItem,
  CreateVisitorPayload,
  UpdateVisitorPayload,
  VisitorFiltersParams,
} from '../types/visitor.types';

export const visitorsApi = {
  getAll: (params?: VisitorFiltersParams): Promise<AxiosResponse<ApiListResponse<VisitorListItem>>> =>
    globalApi.getAll(params) as Promise<AxiosResponse<ApiListResponse<VisitorListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Visitor>>> =>
    globalApi.getById(id) as Promise<AxiosResponse<ApiResponse<Visitor>>>,

  create: (payload: CreateVisitorPayload): Promise<AxiosResponse<ApiResponse<Visitor>>> =>
    globalApi.create(payload) as Promise<AxiosResponse<ApiResponse<Visitor>>>,

  update: (id: string, payload: UpdateVisitorPayload): Promise<AxiosResponse<ApiResponse<Visitor>>> =>
    globalApi.update(id, payload) as Promise<AxiosResponse<ApiResponse<Visitor>>>,

  remove: (id: string): Promise<AxiosResponse<void>> =>
    globalApi.remove(id) as Promise<AxiosResponse<void>>,

  checkIn: (id: string): Promise<AxiosResponse<ApiResponse<Visitor>>> =>
    globalApi.checkIn(id) as Promise<AxiosResponse<ApiResponse<Visitor>>>,

  checkOut: (id: string): Promise<AxiosResponse<ApiResponse<Visitor>>> =>
    globalApi.checkOut(id) as Promise<AxiosResponse<ApiResponse<Visitor>>>,
};
