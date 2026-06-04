import apiClient from './client';

export interface Amenity {
  id:          string;
  society_id:  number;
  name:        string;
  description: string | null;
  is_active:   boolean;
  created_at:  string;
  updated_at:  string;
}

export interface CreateAmenityDto {
  society_id:   number;
  name:         string;
  description?: string;
  is_active?:   boolean;
}

export type UpdateAmenityDto = Partial<CreateAmenityDto>;

export interface AmenityFilters {
  society_id?: number;
  page?:       number;
  limit?:      number;
}

const BASE = '/amenities';

export const amenitiesApi = {
  getAll:  (params?: AmenityFilters) =>
    apiClient.get<Amenity[]>(BASE, { params }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<Amenity>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateAmenityDto) =>
    apiClient.post<Amenity>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateAmenityDto) =>
    apiClient.put<Amenity>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};
