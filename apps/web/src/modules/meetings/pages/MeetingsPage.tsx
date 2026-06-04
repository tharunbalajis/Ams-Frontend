import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { MeetingTable } from '../components/MeetingTable';
import { MeetingForm }  from '../components/MeetingForm';
import { useMeetings, useCreateMeeting, useUpdateMeeting, useDeleteMeeting } from '../hooks/useMeetings';
import { usePagination } from '@/hooks/usePagination';
import { useAuth }       from '@/hooks/useAuth';
import type { Meeting, CreateMeetingDto } from '@/api/meetings.api';

export function MeetingsPage() {
  const { user } = useAuth();
  const societyId = Number(user?.society_id ?? 1);
  const { page, pageSize, setPage } = usePagination(1, 20);

  const [editMeeting, setEditMeeting] = useState<Meeting | null>(null);
  const [showForm,    setShowForm]    = useState(false);

  const { data, isLoading } = useMeetings({ society_id: societyId });
  const { mutate: create, isPending: creating } = useCreateMeeting();
  const { mutate: update, isPending: updating } = useUpdateMeeting(editMeeting?.id ?? '');
  const { mutate: remove } = useDeleteMeeting();

  const handleSubmit = (values: CreateMeetingDto) => {
    if (editMeeting) {
      update(values, { onSuccess: () => { setEditMeeting(null); setShowForm(false); } });
    } else {
      create(values, { onSuccess: () => setShowForm(false) });
    }
  };

  const allItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meetings"
        description="Schedule and manage society meetings"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Meetings' },
          ]} />
        }
        actions={
          <Button onClick={() => { setEditMeeting(null); setShowForm(true); }}>
            Schedule Meeting
          </Button>
        }
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{editMeeting ? 'Edit Meeting' : 'New Meeting'}</h3>
          <MeetingForm
            meeting={editMeeting ?? undefined}
            societyId={societyId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditMeeting(null); }}
            isPending={creating || updating}
          />
        </div>
      )}

      <MeetingTable
        data={allItems}
        loading={isLoading}
        pagination={{ page, pageSize, total: allItems.length }}
        onPageChange={setPage}
        onEdit={(m) => { setEditMeeting(m); setShowForm(true); }}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}
