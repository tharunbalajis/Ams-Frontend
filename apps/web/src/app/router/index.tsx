import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate }  from 'react-router-dom';
import { ROUTES }         from './routeConfig';
import { ProtectedRoute } from '@/app/guards/ProtectedRoute';
import { RoleRoute }      from '@/app/guards/RoleRoute';
import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { AuthLayout }      from '@/app/layouts/AuthLayout';
import { ROLES }           from '@/config/roles';
import { LoadingState }    from '@ams/ui';

// Auth pages
const LoginPage          = lazy(() => import('@/modules/auth/pages/LoginPage').then((m)          => ({ default: m.LoginPage })));
const UserManagementPage = lazy(() => import('@/modules/auth/pages/UserManagementPage').then((m) => ({ default: m.UserManagementPage })));
const AuditLogsPage      = lazy(() => import('@/modules/auth/pages/AuditLogsPage').then((m)      => ({ default: m.AuditLogsPage })));

// Dashboard
const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));

// Residents
const ResidentListPage    = lazy(() => import('@/modules/residents/pages/ResidentListPage').then((m)    => ({ default: m.ResidentListPage })));
const ResidentDetailPage  = lazy(() => import('@/modules/residents/pages/ResidentDetailPage').then((m)  => ({ default: m.ResidentDetailPage })));
const AddResidentPage     = lazy(() => import('@/modules/residents/pages/AddResidentPage').then((m)     => ({ default: m.AddResidentPage })));
const EditResidentPage    = lazy(() => import('@/modules/residents/pages/EditResidentPage').then((m)    => ({ default: m.EditResidentPage })));
const ResidentProfilePage = lazy(() => import('@/modules/residents/pages/ResidentProfilePage').then((m) => ({ default: m.ResidentProfilePage })));

// Units
const UnitListPage   = lazy(() => import('@/modules/units/pages/UnitListPage').then((m)   => ({ default: m.UnitListPage })));
const UnitDetailPage = lazy(() => import('@/modules/units/pages/UnitDetailPage').then((m) => ({ default: m.UnitDetailPage })));
const AddUnitPage    = lazy(() => import('@/modules/units/pages/AddUnitPage').then((m)    => ({ default: m.AddUnitPage })));
const EditUnitPage   = lazy(() => import('@/modules/units/pages/EditUnitPage').then((m)   => ({ default: m.EditUnitPage })));

// Visitors
const VisitorLogsPage         = lazy(() => import('@/modules/visitors/pages/VisitorLogsPage').then((m)         => ({ default: m.VisitorLogsPage })));
const VisitorDetailPage       = lazy(() => import('@/modules/visitors/pages/VisitorDetailPage').then((m)       => ({ default: m.VisitorDetailPage })));
const PreApprovedVisitorsPage = lazy(() => import('@/modules/visitors/pages/PreApprovedVisitorsPage').then((m) => ({ default: m.PreApprovedVisitorsPage })));
const SOSDashboardPage        = lazy(() => import('@/modules/visitors/pages/SOSDashboardPage').then((m)        => ({ default: m.SOSDashboardPage })));

// Complaints
const ComplaintListPage      = lazy(() => import('@/modules/complaints/pages/ComplaintListPage').then((m)      => ({ default: m.ComplaintListPage })));
const ComplaintDetailPage    = lazy(() => import('@/modules/complaints/pages/ComplaintDetailPage').then((m)    => ({ default: m.ComplaintDetailPage })));
const CreateComplaintPage    = lazy(() => import('@/modules/complaints/pages/CreateComplaintPage').then((m)    => ({ default: m.CreateComplaintPage })));
const ComplaintDashboardPage = lazy(() => import('@/modules/complaints/pages/ComplaintDashboardPage').then((m) => ({ default: m.ComplaintDashboardPage })));
const ComplaintKanbanPage    = lazy(() => import('@/modules/complaints/pages/ComplaintKanbanPage').then((m)    => ({ default: m.ComplaintKanbanPage })));

// Financials
const FinancialDashboardPage = lazy(() => import('@/modules/financials/pages/FinancialDashboardPage').then((m) => ({ default: m.FinancialDashboardPage })));
const InvoiceListPage        = lazy(() => import('@/modules/financials/pages/InvoiceListPage').then((m)        => ({ default: m.InvoiceListPage })));
const InvoiceDetailPage      = lazy(() => import('@/modules/financials/pages/InvoiceDetailPage').then((m)      => ({ default: m.InvoiceDetailPage })));
const PaymentsPage           = lazy(() => import('@/modules/financials/pages/PaymentsPage').then((m)           => ({ default: m.PaymentsPage })));
const ExpensesPage           = lazy(() => import('@/modules/financials/pages/ExpensesPage').then((m)           => ({ default: m.ExpensesPage })));
const MaintenanceHeadsPage   = lazy(() => import('@/modules/financials/pages/MaintenanceHeadsPage').then((m)   => ({ default: m.MaintenanceHeadsPage })));

const PageLoader = () => (
  <div className="flex h-64 items-center justify-center">
    <LoadingState variant="spinner" />
  </div>
);

function S({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const ADMIN_ROLES     = [ROLES.SUPER_ADMIN, ROLES.ADMIN];
const FINANCIAL_ROLES = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNTANT];
const SECURITY_ROLES  = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SECURITY];

function OutOfScope({ name }: { name: string }) {
  return (
    <div className="p-8 text-center text-muted-foreground">
      <p className="text-base font-medium">{name}</p>
      <p className="mt-1 text-sm opacity-60">This module is out of scope for this phase.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <S><LoginPage /></S> },
    ],
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Dashboard
      { path: ROUTES.DASHBOARD, element: <S><DashboardPage /></S> },

      // Residents
      { path: ROUTES.RESIDENTS,        element: <S><ResidentListPage /></S> },
      { path: ROUTES.RESIDENT_CREATE,  element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><AddResidentPage /></RoleRoute></S> },
      { path: ROUTES.RESIDENT_DETAIL,  element: <S><ResidentDetailPage /></S> },
      { path: ROUTES.RESIDENT_EDIT,    element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><EditResidentPage /></RoleRoute></S> },
      { path: ROUTES.RESIDENT_PROFILE, element: <S><ResidentProfilePage /></S> },

      // Units
      { path: ROUTES.UNITS,       element: <S><UnitListPage /></S> },
      { path: ROUTES.UNIT_CREATE, element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><AddUnitPage /></RoleRoute></S> },
      { path: ROUTES.UNIT_DETAIL, element: <S><UnitDetailPage /></S> },
      { path: ROUTES.UNIT_EDIT,   element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><EditUnitPage /></RoleRoute></S> },

      // Visitors
      { path: ROUTES.VISITORS,         element: <S><VisitorLogsPage /></S> },
      { path: ROUTES.VISITOR_DETAIL,   element: <S><VisitorDetailPage /></S> },
      { path: ROUTES.VISITORS_INVITES, element: <S><PreApprovedVisitorsPage /></S> },
      { path: ROUTES.VISITORS_SOS,     element: <S><RoleRoute allowedRoles={SECURITY_ROLES}><SOSDashboardPage /></RoleRoute></S> },

      // Complaints
      { path: ROUTES.COMPLAINTS,          element: <S><ComplaintListPage /></S> },
      { path: ROUTES.COMPLAINT_CREATE,    element: <S><CreateComplaintPage /></S> },
      { path: ROUTES.COMPLAINT_DETAIL,    element: <S><ComplaintDetailPage /></S> },
      { path: ROUTES.COMPLAINT_DASHBOARD, element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><ComplaintDashboardPage /></RoleRoute></S> },
      { path: ROUTES.COMPLAINT_KANBAN,    element: <S><ComplaintKanbanPage /></S> },

      // Financials
      { path: ROUTES.FINANCIALS,          element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><FinancialDashboardPage /></RoleRoute></S> },
      { path: ROUTES.FINANCIALS_INVOICES, element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><InvoiceListPage /></RoleRoute></S> },
      { path: ROUTES.FINANCIALS_INVOICE,  element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><InvoiceDetailPage /></RoleRoute></S> },
      { path: ROUTES.FINANCIALS_PAYMENTS, element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><PaymentsPage /></RoleRoute></S> },
      { path: ROUTES.FINANCIALS_EXPENSES, element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><ExpensesPage /></RoleRoute></S> },
      { path: ROUTES.FINANCIALS_HEADS,    element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><MaintenanceHeadsPage /></RoleRoute></S> },

      // Admin
      { path: ROUTES.ADMIN_USERS,      element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><UserManagementPage /></RoleRoute></S> },
      { path: ROUTES.ADMIN_AUDIT_LOGS, element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><AuditLogsPage /></RoleRoute></S> },

      // Out-of-scope modules
      { path: ROUTES.AMENITIES,  element: <OutOfScope name="Amenities" /> },
      { path: ROUTES.STAFF,      element: <OutOfScope name="Staff" /> },
      { path: ROUTES.ASSETS,     element: <OutOfScope name="Assets" /> },
      { path: ROUTES.NOTICES,    element: <OutOfScope name="Notices" /> },
      { path: ROUTES.MEETINGS,   element: <OutOfScope name="Meetings" /> },
      { path: ROUTES.COMPLIANCE, element: <OutOfScope name="Compliance" /> },
      { path: ROUTES.SETTINGS,   element: <OutOfScope name="Settings" /> },
    ],
  },
]);
