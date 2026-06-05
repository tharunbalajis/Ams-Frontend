import { useNavigate } from 'react-router-dom';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';

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

function KpiSkeleton() {
  return (
    <div className="rounded-xl border p-5 bg-muted animate-pulse">
      <div className="h-3 w-24 rounded bg-muted-foreground/20 mb-3" />
      <div className="h-8 w-16 rounded bg-muted-foreground/20 mb-2" />
      <div className="h-3 w-32 rounded bg-muted-foreground/20" />
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: metrics, isLoading } = useDashboardMetrics();

  const r  = metrics?.residents;
  const u  = metrics?.units;
  const v  = metrics?.visitors;
  const c  = metrics?.complaints;
  const f  = metrics?.financials;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Green Valley Apartments — Overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <KpiSkeleton key={i} />)
        ) : (
          <>
            <KpiCard label="Total Residents"     value={r?.total ?? 0}                                            color="blue"   sub={`${r?.active ?? 0} active`} />
            <KpiCard label="Occupied Units"      value={`${u?.occupied ?? 0} / ${u?.total ?? 0}`}                color="green"  sub={`${u?.occupancy ?? 0}% occupancy`} />
            <KpiCard label="Open Complaints"     value={c?.open ?? 0}                                            color="amber"  sub="awaiting resolution" />
            <KpiCard label="Visitors Today"      value={v?.today ?? 0}                                           color="purple" sub={`${v?.active ?? 0} still inside`} />
            <KpiCard label="Monthly Collection"  value={`₹${(f?.monthlyCollection ?? 0).toLocaleString('en-IN')}`} color="green"  sub="this month" />
            <KpiCard label="Pending Payments"    value={`₹${(f?.pendingPayments ?? 0).toLocaleString('en-IN')}`}   color="amber"  sub="awaiting payment" />
            <KpiCard label="Overdue Amount"      value={`₹${(f?.overdueAmount ?? 0).toLocaleString('en-IN')}`}     color="red"    sub="past due date" />
            <KpiCard label="Active Staff"        value={metrics?.staff?.active ?? 0}                             color="blue"   sub="on duty" />
          </>
        )}
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
