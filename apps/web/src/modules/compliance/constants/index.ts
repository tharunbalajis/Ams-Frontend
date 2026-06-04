import type { DocumentType, ComplianceStatus } from '@/api/compliance.api';

export const DOCUMENT_TYPE_OPTIONS: { label: string; value: DocumentType }[] = [
  { label: 'Registration', value: 'REGISTRATION' },
  { label: 'License',      value: 'LICENSE' },
  { label: 'NOC',          value: 'NOC' },
  { label: 'Audit',        value: 'AUDIT' },
];

export const COMPLIANCE_STATUS_OPTIONS: { label: string; value: ComplianceStatus }[] = [
  { label: 'Valid',          value: 'valid' },
  { label: 'Expiring Soon',  value: 'expiring_soon' },
  { label: 'Expired',        value: 'expired' },
];
