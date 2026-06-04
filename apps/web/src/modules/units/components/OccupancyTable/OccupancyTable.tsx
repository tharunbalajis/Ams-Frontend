import { LoadingState } from '@ams/ui';
import type { OccupancyRecord } from '../../api/occupancy.api';

export interface OccupancyTableProps {
  data:     OccupancyRecord[];
  loading?: boolean;
}

export function OccupancyTable({ data, loading }: OccupancyTableProps) {
  if (loading) return <LoadingState variant="skeleton" />;

  if (data.length === 0) {
    return <p className="py-4 text-center text-sm text-muted-foreground">No occupancy history.</p>;
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="border-b text-left">
          <tr>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 pr-4 font-medium">From</th>
            <th className="py-2 pr-4 font-medium">Until</th>
            <th className="py-2 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b last:border-0">
              <td className="py-2 pr-4 capitalize">{row.status}</td>
              <td className="py-2 pr-4">{row.startDate}</td>
              <td className="py-2 pr-4">{row.endDate ?? '—'}</td>
              <td className="py-2">{row.notes ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
