import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, ServerTable, StatusBadge } from '@ams/ui';
import type { ComplianceRecord } from '@/api/compliance.api';
import type { PaginationState } from '@ams/ui';

export interface ComplianceTableProps {
  data:         ComplianceRecord[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onEdit:       (record: ComplianceRecord) => void;
  onDelete:     (id: string) => void;
}

export function ComplianceTable({ data, loading, pagination, onPageChange, onEdit, onDelete }: ComplianceTableProps) {
  const columns: ColumnDef<ComplianceRecord>[] = [
    { accessorKey: 'document_name', header: 'Document' },
    {
      accessorKey: 'document_type',
      header:      'Type',
      cell:        ({ getValue }) => <Badge variant="outline">{getValue() as string}</Badge>,
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      accessorKey: 'expiry_date',
      header:      'Expiry',
      cell:        ({ getValue }) => (getValue() as string | null) ? new Date(getValue() as string).toLocaleDateString() : '—',
    },
    {
      accessorKey: 'storage_url',
      header:      'Document URL',
      cell:        ({ getValue }) => {
        const url = getValue() as string | null;
        return url ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs">View</a> : '—';
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>Edit</Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(row.original.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <ServerTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyState={<p className="text-muted-foreground">No compliance records found.</p>}
    />
  );
}
