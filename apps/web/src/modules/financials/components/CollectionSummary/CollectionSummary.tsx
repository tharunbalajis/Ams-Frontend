import { Card, CardContent, CardHeader, CardTitle, Progress } from '@ams/ui';
import { COLLECTION_RATE_THRESHOLDS } from '../../constants/collection.constants';
import type { CollectionSummary as CollectionSummaryData } from '../../types/collection.types';

export interface CollectionSummaryProps {
  summary:  CollectionSummaryData;
  loading?: boolean;
}

export function CollectionSummary({ summary }: CollectionSummaryProps) {
  const rate    = summary.collectionRate;
  const variant = rate >= COLLECTION_RATE_THRESHOLDS.EXCELLENT ? 'default' :
                  rate >= COLLECTION_RATE_THRESHOLDS.GOOD       ? 'default' : 'destructive';

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Total Billed</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold">₹{summary.totalBilled.toLocaleString()}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Collected</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-green-600">₹{summary.totalCollected.toLocaleString()}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-destructive">₹{summary.totalPending.toLocaleString()}</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Collection Rate</CardTitle>
          <span className={`text-sm font-semibold ${rate >= COLLECTION_RATE_THRESHOLDS.GOOD ? 'text-green-600' : 'text-destructive'}`}>{rate.toFixed(1)}%</span>
        </CardHeader>
        <CardContent>
          <Progress value={rate} variant={variant} />
          <p className="mt-1 text-xs text-muted-foreground">{summary.defaulterCount} defaulters</p>
        </CardContent>
      </Card>
    </div>
  );
}
