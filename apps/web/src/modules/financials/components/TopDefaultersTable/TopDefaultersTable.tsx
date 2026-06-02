import { Badge } from '@ams/ui';
import type { Defaulter } from '../../types/collection.types';

export interface TopDefaultersTableProps {
  data:     Defaulter[];
  limit?:   number;
  loading?: boolean;
}

export function TopDefaultersTable({ data, limit = 5, loading }: TopDefaultersTableProps) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading defaulters…</p>;

  const top = [...data].sort((a, b) => b.outstandingAmount - a.outstandingAmount).slice(0, limit);

  return (
    <ul className="divide-y">
      {top.map((d) => (
        <li key={d.residentId} className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium">{d.residentName}</p>
            <p className="text-xs text-muted-foreground">Unit {d.unitNumber} · {d.daysOverdue}d overdue</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-destructive">₹{d.outstandingAmount.toLocaleString()}</p>
            <Badge variant={d.noticeStatus === 'none' ? 'outline' : 'warning'} className="text-xs">
              {d.invoiceCount} invoice{d.invoiceCount !== 1 ? 's' : ''}
            </Badge>
          </div>
        </li>
      ))}
      {top.length === 0 && <p className="py-3 text-sm text-muted-foreground">No defaulters.</p>}
    </ul>
  );
}
