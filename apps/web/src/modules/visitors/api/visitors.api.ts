import apiClient from '@/api/client';
import { getSocietyId } from '@/utils/getSocietyId';
import { adaptListResponse } from '@/api/utils';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Visitor,
  CreateVisitorPayload,
  UpdateVisitorPayload,
  VisitorFiltersParams,
} from '../types/visitor.types';

const BASE = '/visitors';

const sid = (): number => {
  const id = getSocietyId();
  return typeof id === 'number' ? id : 1;
};

export const visitorsApi = {
  getAll: async (params?: VisitorFiltersParams): Promise<ApiListResponse<Visitor>> => {
    try {
      const queryParams = { 
        society_id: sid(), 
        limit: 20, 
        offset: 0, 
        ...params 
      };
      // Only include defined params
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined && v !== null)
      );
      const response = await apiClient.get(BASE, { params: filteredParams });
      return adaptListResponse<Visitor>(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      return { data: [], total: 0, success: false };
    }
  },

  getById: async (id: string): Promise<ApiResponse<Visitor>> => {
    try {
      const response = await apiClient.get<Visitor>(`${BASE}/${id}`);
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error fetching visitor:', error);
      return { data: null, success: false };
    }
  },

  create: async (payload: CreateVisitorPayload): Promise<ApiResponse<Visitor>> => {
    try {
      const response = await apiClient.post<Visitor>(BASE, { ...payload, society_id: sid() });
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error creating visitor:', error);
      return { data: null, success: false };
    }
  },

  update: async (id: string, payload: UpdateVisitorPayload): Promise<ApiResponse<Visitor>> => {
    try {
      const response = await apiClient.put<Visitor>(`${BASE}/${id}`, payload);
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error updating visitor:', error);
      return { data: null, success: false };
    }
  },

  remove: async (id: string): Promise<{ success: boolean }> => {
    try {
      await apiClient.delete(`${BASE}/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting visitor:', error);
      return { success: false };
    }
  },

  checkIn: async (id: string, guardId?: string): Promise<ApiResponse<Visitor>> => {
    try {
      const response = await apiClient.put<Visitor>(`${BASE}/${id}/checkin`, guardId ? { guard_id: guardId } : {});
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error checking in visitor:', error);
      return { data: null, success: false };
    }
  },

  checkOut: async (id: string): Promise<ApiResponse<Visitor>> => {
    try {
      const response = await apiClient.put<Visitor>(`${BASE}/${id}/checkout`, {});
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error checking out visitor:', error);
      return { data: null, success: false };
    }
  },
};

export const visitorPassesApi = {
  getAll: (params?: { unit_id?: string; resident_id?: string }) =>
    apiClient.get('/visitor-passes', { params: { society_id: sid(), ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/visitor-passes', { ...payload, society_id: sid() }).then((r) => r.data),

  revoke: (id: string) =>
    apiClient.put(`/visitor-passes/${id}/revoke`, {}).then((r) => r.data),
};

export const visitorInvitesApi = {
  getAll: () =>
    apiClient.get('/visitor-invites', { params: { society_id: sid() } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/visitor-invites', { ...payload, society_id: sid() }).then((r) => r.data),

  revoke: (id: string, reason: string) =>
    apiClient.put(`/visitor-invites/${id}/revoke`, { revoke_reason: reason }).then((r) => r.data),
};

export const deliveriesApi = {
  getAll: (params?: { status?: string; limit?: number; offset?: number }) =>
    apiClient.get('/deliveries', { params: { society_id: sid(), limit: 20, offset: 0, ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/deliveries', { ...payload, society_id: sid() }).then((r) => r.data),

  collect: (id: string) =>
    apiClient.put(`/deliveries/${id}/collect`, {}).then((r) => r.data),
};

export const sosApi = {
  getAll: (params?: { status?: string }) =>
    apiClient.get('/sos', { params: { society_id: sid(), ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/sos', { ...payload, society_id: sid() }).then((r) => r.data),

  acknowledge: (id: string) =>
    apiClient.put(`/sos/${id}/acknowledge`, {}).then((r) => r.data),

  resolve: (id: string) =>
    apiClient.put(`/sos/${id}/resolve`, {}).then((r) => r.data),
};