import { useState } from 'react';
import {
  Breadcrumbs, PageHeader, Card, CardContent, CardHeader, CardTitle,
  LoadingState, EmptyState, Badge,
} from '@ams/ui';
import { useAuditLogs } from '../hooks/useUsers';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce }   from '@/hooks/useDebounce';

const PAGE_SIZE = 50;

export function AuditLogsPage() {
  const { page, setPage } = usePagination(1, PAGE_SIZE);
  const [userFilter, setUserFilter]     = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const debouncedUser   = useDebounce(userFilter,   300);
  const debouncedAction = useDebounce(actionFilter, 300);

  const { data, isLoading } = useAuditLogs({
    ...(debouncedUser   ? { userId:   debouncedUser }   : {}),
    ...(debouncedAction ? { action:   debouncedAction } : {}),
    page,
    limit: PAGE_SIZE,
  });

  const total = data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="System activity and security audit trail"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Audit Logs' },
          ]} />
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="mr-auto">Activity Log</CardTitle>
            <input
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="Filter by user ID..."
              className="h-9 w-48 rounded-md border border-input bg-background px-3 text-sm"
            />
            <input
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              placeholder="Filter by action..."
              className="h-9 w-48 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingState variant="skeleton" rows={10} />}

          {!isLoading && !data?.data?.length && (
            <EmptyState title="No logs found" description="No audit activity matches your filters." />
          )}

          {!isLoading && !!data?.data?.length && (
            <div className="space-y-0 divide-y text-sm">
              {data.data.map((log) => (
                <div key={log.id} className="flex items-start justify-between gap-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="font-mono text-xs">{log.action}</Badge>
                      <span className="text-muted-foreground">{log.resource}</span>
                      {log.resourceId && (
                        <span className="font-mono text-xs text-muted-foreground truncate max-w-[120px]">
                          #{log.resourceId}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {log.userEmail}
                      {log.ipAddress && ` · ${log.ipAddress}`}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </time>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Page {page} of {totalPages} · {total} total</span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded border px-3 py-1 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded border px-3 py-1 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
