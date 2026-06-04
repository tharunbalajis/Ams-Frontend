import apiClient from './client';

export type NoticeType = 'GENERAL' | 'EMERGENCY' | 'MAINTENANCE';

export interface Notice {
  id:          string;
  title:       string;
  description: string;
  created_by:  string;
  notice_type: NoticeType;
  created_at:  string;
  updated_at:  string;
}

export interface CreateNoticeDto {
  title:        string;
  description:  string;
  created_by:   string;
  notice_type?: NoticeType;
}

export type UpdateNoticeDto = Partial<CreateNoticeDto>;

export interface NoticeFilters {
  notice_type?: NoticeType;
  page?:        number;
  limit?:       number;
}

const BASE = '/notices';

export const noticesApi = {
  getAll:  (params?: NoticeFilters) =>
    apiClient.get<Notice[]>(BASE, { params }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<Notice>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateNoticeDto) =>
    apiClient.post<Notice>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateNoticeDto) =>
    apiClient.put<Notice>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};
