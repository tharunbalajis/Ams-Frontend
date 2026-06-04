export interface AgingBucket {
  label:  string;
  amount: number;
  count:  number;
}

export interface CollectionSummary {
  totalBilled:    number;
  totalCollected: number;
  totalPending:   number;
  collectionRate: number;
  defaulterCount: number;
}
