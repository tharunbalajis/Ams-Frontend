import type { ID } from '@/types/common.types';

export interface CollectionRecord {
  id:               ID;
  residentId:       ID;
  residentName:     string;
  unitNumber:       string;
  invoiceId:        ID;
  invoiceNumber:    string;
  invoiceAmount:    number;
  collectedAmount:  number;
  pendingAmount:    number;
  collectionDate:   string;
  daysOverdue:      number;
}

export interface CollectionSummary {
  period:             string;
  totalBilled:        number;
  totalCollected:     number;
  totalPending:       number;
  collectionRate:     number;
  defaulterCount:     number;
}

export interface CollectionFiltersParams {
  search?:    string;
  dateFrom?:  string;
  dateTo?:    string;
  page?:      number;
  pageSize?:  number;
}

export interface Defaulter {
  residentId:       ID;
  residentName:     string;
  unitNumber:       string;
  outstandingAmount: number;
  oldestDueDate:    string;
  daysOverdue:      number;
  invoiceCount:     number;
  noticeStatus:     'none' | 'first_notice' | 'second_notice' | 'legal';
}

export interface AgingBucket {
  label:    string;
  days:     string;
  amount:   number;
  count:    number;
}
