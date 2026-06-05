import apiClient from '@/api/client';
import { getSocietyId } from '@/utils/getSocietyId';
import { adaptListResponse } from '@/api/utils';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type {
  Resident,
  ResidentSummary,
  CreateResidentPayload,
  UpdateResidentPayload,
  ResidentFiltersParams,
} from '../types/resident.types';

const BASE = '/residents';

const sid = (): number => {
  const id = getSocietyId();
  return typeof id === 'number' ? id : 1;
};

export const residentsApi = {
  getAll: async (params?: ResidentFiltersParams): Promise<ApiListResponse<Resident>> => {
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
      return adaptListResponse<Resident>(response.data);
    } catch (error) {
      console.error('Error fetching residents:', error);
      return { data: [], total: 0, success: false };
    }
  },

  getSummary: async (): Promise<ApiResponse<ResidentSummary>> => {
    try {
      const response = await apiClient.get(`${BASE}/summary`, { params: { society_id: sid() } });
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error fetching resident summary:', error);
      return { data: null, success: false };
    }
  },

  getById: async (id: string): Promise<ApiResponse<Resident>> => {
    try {
      const response = await apiClient.get<Resident>(`${BASE}/${id}`);
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error fetching resident:', error);
      return { data: null, success: false };
    }
  },

  create: async (payload: CreateResidentPayload): Promise<ApiResponse<Resident>> => {
    try {
      const response = await apiClient.post<Resident>(BASE, { ...payload, society_id: sid() });
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error creating resident:', error);
      return { data: null, success: false };
    }
  },

  update: async (id: string, payload: UpdateResidentPayload): Promise<ApiResponse<Resident>> => {
    try {
      const response = await apiClient.put<Resident>(`${BASE}/${id}`, payload);
      return { data: response.data, success: true };
    } catch (error) {
      console.error('Error updating resident:', error);
      return { data: null, success: false };
    }
  },

  remove: async (id: string): Promise<{ success: boolean }> => {
    try {
      await apiClient.delete(`${BASE}/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting resident:', error);
      return { success: false };
    }
  },
};

export const blocksApi = {
  getAll: () =>
    apiClient.get('/blocks', { params: { society_id: sid() } }).then((r) => adaptListResponse(r.data)),

  getById: (id: string) =>
    apiClient.get(`/blocks/${id}`).then((r) => r.data),

  create: (payload: any) =>
    apiClient.post('/blocks', { ...payload, society_id: sid() }).then((r) => r.data),

  update: (id: string, payload: any) =>
    apiClient.put(`/blocks/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`/blocks/${id}`).then((r) => r.data),
};

export const unitsApi = {
  getAll: (params?: { block_id?: string; ownership_type?: string; limit?: number; offset?: number }) =>
    apiClient.get('/units', { params: { society_id: sid(), limit: 20, offset: 0, ...params } }).then((r) => adaptListResponse(r.data)),

  getById: (id: string) =>
    apiClient.get(`/units/${id}`).then((r) => r.data),

  create: (payload: any) =>
    apiClient.post('/units', { ...payload, society_id: sid() }).then((r) => r.data),

  update: (id: string, payload: any) =>
    apiClient.put(`/units/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`/units/${id}`).then((r) => r.data),
};

export const vehiclesApi = {
  getAll: (params?: { unit_id?: string; resident_id?: string }) =>
    apiClient.get('/vehicles', { params: { society_id: sid(), ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/vehicles', { ...payload, society_id: sid() }).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`/vehicles/${id}`).then((r) => r.data),
};

export const petsApi = {
  getAll: (params?: { unit_id?: string; resident_id?: string }) =>
    apiClient.get('/pets', { params: { society_id: sid(), ...params } }).then((r) => adaptListResponse(r.data)),

  create: (payload: any) =>
    apiClient.post('/pets', { ...payload, society_id: sid() }).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`/pets/${id}`).then((r) => r.data),
};

export const leasesApi = {
  getAll: () =>
    apiClient.get('/leases', { params: { society_id: sid() } }).then((r) => adaptListResponse(r.data)),

  getById: (id: string) =>
    apiClient.get(`/leases/${id}`).then((r) => r.data),

  create: (payload: any) =>
    apiClient.post('/leases', { ...payload, society_id: sid() }).then((r) => r.data),

  update: (id: string, payload: any) =>
    apiClient.put(`/leases/${id}`, payload).then((r) => r.data),
};