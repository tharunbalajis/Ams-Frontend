import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { NoticeTable } from '../components/NoticeTable';
import { NoticeForm }  from '../components/NoticeForm';
import { useNotices, useCreateNotice, useUpdateNotice, useDeleteNotice } from '../hooks/useNotices';
import { usePagination } from '@/hooks/usePagination';
import { useAuth }       from '@/hooks/useAuth';
import type { Notice, CreateNoticeDto } from '@/api/notices.api';

export function NoticesPage() {
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { page, pageSize, setPage } = usePagination(1, 20);

  const [editNotice, setEditNotice] = useState<Notice | null>(null);
  const [showForm,   setShowForm]   = useState(false);

  const { data, isLoading } = useNotices();
  const { mutate: create, isPending: creating } = useCreateNotice();
  const { mutate: update, isPending: updating } = useUpdateNotice(editNotice?.id ?? '');
  const { mutate: remove } = useDeleteNotice();

  const handleSubmit = (values: CreateNoticeDto) => {
    if (editNotice) {
      update(values, { onSuccess: () => { setEditNotice(null); setShowForm(false); } });
    } else {
      create(values, { onSuccess: () => setShowForm(false) });
    }
  };

  const allItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices"
        description="Publish and manage society notices"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Notices' },
          ]} />
        }
        actions={
          <Button onClick={() => { setEditNotice(null); setShowForm(true); }}>
            New Notice
          </Button>
        }
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{editNotice ? 'Edit Notice' : 'New Notice'}</h3>
          <NoticeForm
            notice={editNotice ?? undefined}
            userId={userId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditNotice(null); }}
            isPending={creating || updating}
          />
        </div>
      )}

      <NoticeTable
        data={allItems}
        loading={isLoading}
        pagination={{ page, pageSize, total: allItems.length }}
        onPageChange={setPage}
        onEdit={(n) => { setEditNotice(n); setShowForm(true); }}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}
