import apiClient from './client';
import type { Visitor } from '@/modules/visitors/types/visitor.types';

export const visitorsApi = {
  getDashboard: () => apiClient.get('/visitors/dashboard'),
  getAll: (params?: { society_id?: number; status?: string }) =>
    apiClient.get<Visitor[]>('/visitors', { params }),
  create: (data: {
    visitor_name: string; visitor_type: string;
    society_id?: number; unit_id?: number; resident_id?: string;
    purpose?: string; visitor_mobile?: string;
  }) => apiClient.post<Visitor>('/visitors', data),
  checkIn:  (id: string) => apiClient.put(`/visitors/${id}/checkin`, {}),
  checkOut: (id: string) => apiClient.put(`/visitors/${id}/checkout`, {}),
  getInvites: (params?: object) => apiClient.get('/visitors/invites', { params }),
  createInvite: (data: object) => apiClient.post('/visitors/invites', data),
  revokeInvite: (id: string, data: { revoke_reason: string }) =>
    apiClient.put(`/visitors/invites/${id}/revoke`, data),
  getDeliveries: (params?: object) => apiClient.get('/delivery-entries', { params }),
  createDelivery: (data: object) => apiClient.post('/delivery-entries', data),
  markDelivered: (id: string) => apiClient.put(`/delivery-entries/${id}/delivered`, {}),
};
