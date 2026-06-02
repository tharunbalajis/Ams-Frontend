import * as React from 'react';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { cn } from '../../styles/theme';
import { Button } from '../buttons/Button';

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortingState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface ServerTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  onRowClick?: (row: TData) => void;
  className?: string;
}

function ServerTable<TData, TValue>({
  columns,
  data,
  loading = false,
  emptyState,
  pagination,
  onPageChange,
  sorting,
  onSortingChange,
  onRowClick,
  className,
}: ServerTableProps<TData, TValue>) {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSort = (columnId: string) => {
    onSortingChange?.({
      column: columnId,
      direction: sorting?.column === columnId && sorting.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const start = Math.min((pagination.page - 1) * pagination.pageSize + 1, pagination.total);
  const end   = Math.min(pagination.page * pagination.pageSize, pagination.total);

  if (loading) {
    return (
      <div className={cn('w-full space-y-2', className)}>
        {Array.from({ length: Math.min(pagination.pageSize, 5) }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b bg-muted/50">
                {hg.headers.map((header) => (
                  <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn('flex items-center gap-1', onSortingChange && 'cursor-pointer select-none')}
                        onClick={() => onSortingChange && handleSort(header.id)}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {onSortingChange && sorting?.column === header.id && (
                          <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn('border-b transition-colors hover:bg-muted/50', onRowClick && 'cursor-pointer')}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  {emptyState ?? <p className="text-muted-foreground">No results.</p>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">
          {pagination.total === 0 ? 'No results' : `Showing ${start}–${end} of ${pagination.total}`}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onPageChange(pagination.page - 1)} disabled={pagination.page <= 1}>
            Previous
          </Button>
          <span className="text-sm tabular-nums">{pagination.page} / {totalPages || 1}</span>
          <Button variant="outline" size="sm" onClick={() => onPageChange(pagination.page + 1)} disabled={pagination.page >= totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ServerTable };
