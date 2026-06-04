import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/client';
import { useAuth } from '@/hooks/useAuth';

function KpiCard({
  label, value, sub, color = 'blue',
}: {
  label: string; value: string | number; sub?: string; color?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
}) {
  const bg: Record<string, string> = {
    blue:   'bg-blue-50 text-blue-600',
    green:  'bg-green-50 text-green-600',
    amber:  'bg-amber-50 text-amber-600',
    red:    'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className={`rounded-xl border p-5 ${bg[color] ?? bg.blue} bg-opacity-50`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs opacity-60">{sub}</p>}
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const societyId = user?.society_id ?? 1;

  const { data: rd } = useQuery({
    queryKey: ['dashboard', 'residents', societyId],
    queryFn:  () => apiClient.get('/residents/dashboard', { params: { society_id: societyId } }).then(r => r.data as Record<string, unknown>),
  });

  const { data: cd } = useQuery({
    queryKey: ['dashboard', 'complaints'],
    queryFn:  () => apiClient.get('/complaints/dashboard').then(r => r.data as Record<string, unknown>),
  });

  const { data: vd } = useQuery({
    queryKey: ['dashboard', 'visitors'],
    queryFn:  () => apiClient.get('/visitors/dashboard').then(r => r.data as Record<string, unknown>),
  });

  const { data: fd } = useQuery({
    queryKey: ['dashboard', 'finance'],
    queryFn:  () => apiClient.get('/finance/dashboard').then(r => r.data as Record<string, unknown>),
  });

  const get = (obj: Record<string, unknown> | undefined, ...keys: string[]): number => {
    if (!obj) return 0;
    for (const key of keys) {
      const parts = key.split('.');
      let val: unknown = obj;
      for (const p of parts) val = (val as Record<string, unknown>)?.[p];
      if (val != null) return Number(val);
    }
    return 0;
  };

  const totalResidents  = get(rd,  'total_residents', 'residents.total', 'total');
  const occupiedUnits   = get(rd,  'units.occupied', 'occupied_units');
  const totalUnits      = get(rd,  'units.total', 'total_units');
  const occupancyPct    = get(rd,  'units.occupancy_rate_percent', 'occupancy_rate');
  const openComplaints  = get(cd,  'by_status.open', 'open_complaints', 'stats.open', 'open');
  const visitorsToday   = get(vd,  'today.total', 'today_visitors', 'total', 'today');
  const activeVisitors  = get(vd,  'active', 'checked_in');
  const monthlyCollect  = get(fd,  'payments_this_month', 'monthly_collection', 'total_collected');
  const pendingInvoices = get(fd,  'invoices.by_status.PENDING', 'pending_invoices');
  const overdueInvoices = get(fd,  'invoices.by_status.OVERDUE', 'overdue_invoices');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {user?.full_name ? `Welcome back, ${user.full_name}` : 'Green Valley Apartments — Overview'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Residents"    value={totalResidents}  color="blue"   sub="registered residents" />
        <KpiCard label="Occupied Units"     value={`${occupiedUnits} / ${totalUnits}`} color="green" sub={`${occupancyPct}% occupancy`} />
        <KpiCard label="Open Complaints"    value={openComplaints}  color="amber"  sub="awaiting resolution" />
        <KpiCard label="Visitors Today"     value={visitorsToday}   color="purple" sub={`${activeVisitors} still inside`} />
        <KpiCard label="Monthly Collection" value={`₹${monthlyCollect.toLocaleString('en-IN')}`} color="green" sub="this month" />
        <KpiCard label="Pending Invoices"   value={pendingInvoices} color="amber"  sub="awaiting payment" />
        <KpiCard label="Overdue Invoices"   value={overdueInvoices} color="red"    sub="past due date" />
        <KpiCard label="Active Visitors"    value={activeVisitors}  color="blue"   sub="currently inside" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'View Residents',   href: '/residents' },
          { label: 'Manage Units',     href: '/units' },
          { label: 'Complaints',       href: '/complaints' },
          { label: 'Visitor Logs',     href: '/visitors' },
          { label: 'Invoices',         href: '/financials/invoices' },
          { label: 'Staff',            href: '/staff' },
        ].map(({ label, href }) => (
          <button
            key={href}
            onClick={() => void navigate(href)}
            className="flex items-center justify-between rounded-lg border bg-card p-4 text-sm font-medium text-foreground shadow-sm transition-shadow hover:shadow-md"
          >
            {label}
            <span className="text-muted-foreground">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
