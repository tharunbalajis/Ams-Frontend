import apiClient from './client';

export type AssetStatus = 'operational' | 'under_maintenance' | 'retired';

export interface Asset {
  id:               string;
  society_id:       number;
  asset_name:       string;
  asset_type:       string;
  status:           AssetStatus;
  next_service_date: string | null;
  created_at:       string;
  updated_at:       string;
}

export interface CreateAssetDto {
  society_id:        number;
  asset_name:        string;
  asset_type:        string;
  status?:           AssetStatus;
  next_service_date?: string;
}

export type UpdateAssetDto = Partial<CreateAssetDto>;

export interface AssetFilters {
  society_id?: number;
  status?:     AssetStatus;
  page?:       number;
  limit?:      number;
}

const BASE = '/assets';

export const assetsApi = {
  getAll:  (params?: AssetFilters) =>
    apiClient.get<Asset[]>(BASE, { params }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<Asset>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateAssetDto) =>
    apiClient.post<Asset>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateAssetDto) =>
    apiClient.put<Asset>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};
