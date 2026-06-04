import apiClient from './client';

export type DocumentType     = 'REGISTRATION' | 'LICENSE' | 'NOC' | 'AUDIT';
export type ComplianceStatus = 'valid' | 'expiring_soon' | 'expired';

export interface ComplianceRecord {
  id:            string;
  society_id:    number;
  document_name: string;
  document_type: DocumentType;
  expiry_date:   string | null;
  storage_url:   string | null;
  status:        ComplianceStatus;
  created_at:    string;
  updated_at:    string;
}

export interface CreateComplianceDto {
  society_id:     number;
  document_name:  string;
  document_type:  DocumentType;
  expiry_date?:   string;
  storage_url?:   string;
  status?:        ComplianceStatus;
}

export type UpdateComplianceDto = Partial<CreateComplianceDto>;

export interface ComplianceFilters {
  society_id?:    number;
  document_type?: DocumentType;
  status?:        ComplianceStatus;
  page?:          number;
  limit?:         number;
}

const BASE = '/compliance';

export const complianceApi = {
  getAll:  (params?: ComplianceFilters) =>
    apiClient.get<ComplianceRecord[]>(BASE, { params }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<ComplianceRecord>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateComplianceDto) =>
    apiClient.post<ComplianceRecord>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateComplianceDto) =>
    apiClient.put<ComplianceRecord>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};
