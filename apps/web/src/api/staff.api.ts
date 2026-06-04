import apiClient from './client';

export type StaffRole = 'SECURITY' | 'HOUSEKEEPING' | 'MAINTENANCE' | 'VENDOR';

export interface StaffMember {
  id:         string;
  society_id: number;
  name:       string;
  role:       StaffRole;
  mobile:     string;
  is_active:  boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateStaffDto {
  society_id: number;
  name:       string;
  role:       StaffRole;
  mobile:     string;
  is_active?: boolean;
}

export type UpdateStaffDto = Partial<CreateStaffDto>;

export interface StaffFilters {
  society_id?: number;
  role?:       StaffRole;
  is_active?:  boolean;
  page?:       number;
  limit?:      number;
}

const BASE = '/staff';

export const staffApi = {
  getAll:  (params?: StaffFilters) =>
    apiClient.get<StaffMember[]>(BASE, { params }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<StaffMember>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateStaffDto) =>
    apiClient.post<StaffMember>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateStaffDto) =>
    apiClient.put<StaffMember>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};
