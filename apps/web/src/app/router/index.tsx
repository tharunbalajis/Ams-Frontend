import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate }  from 'react-router-dom';
import { ROUTES }         from './routeConfig';
import { ProtectedRoute } from '@/app/guards/ProtectedRoute';
import { RoleRoute }      from '@/app/guards/RoleRoute';
import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { AuthLayout }      from '@/app/layouts/AuthLayout';
import { ROLES }           from '@/config/roles';
import { LoadingState }    from '@ams/ui';
import { RouteError }      from '@/components/shared/RouteError';

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

// New modules
const AmenitiesPage  = lazy(() => import('@/modules/amenities/pages/AmenitiesPage').then((m) => ({ default: m.AmenitiesPage })));
const StaffPage      = lazy(() => import('@/modules/staff/pages/StaffPage').then((m)      => ({ default: m.StaffPage })));
const AssetsPage     = lazy(() => import('@/modules/assets/pages/AssetsPage').then((m)    => ({ default: m.AssetsPage })));
const NoticesPage    = lazy(() => import('@/modules/notices/pages/NoticesPage').then((m)  => ({ default: m.NoticesPage })));
const MeetingsPage   = lazy(() => import('@/modules/meetings/pages/MeetingsPage').then((m) => ({ default: m.MeetingsPage })));
const CompliancePage = lazy(() => import('@/modules/compliance/pages/CompliancePage').then((m) => ({ default: m.CompliancePage })));

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

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace />, errorElement: <RouteError /> },

  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <RouteError />,
    children: [
      { path: ROUTES.LOGIN, element: <S><LoginPage /></S>, errorElement: <RouteError /> },
    ],
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteError />,
    children: [
      { path: ROUTES.DASHBOARD, element: <S><DashboardPage /></S>,             errorElement: <RouteError /> },

      { path: ROUTES.RESIDENTS,        element: <S><ResidentListPage /></S>,                                         errorElement: <RouteError /> },
      { path: ROUTES.RESIDENT_CREATE,  element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><AddResidentPage /></RoleRoute></S>,   errorElement: <RouteError /> },
      { path: ROUTES.RESIDENT_DETAIL,  element: <S><ResidentDetailPage /></S>,                                       errorElement: <RouteError /> },
      { path: ROUTES.RESIDENT_EDIT,    element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><EditResidentPage /></RoleRoute></S>,  errorElement: <RouteError /> },
      { path: ROUTES.RESIDENT_PROFILE, element: <S><ResidentProfilePage /></S>,                                      errorElement: <RouteError /> },

      { path: ROUTES.UNITS,       element: <S><UnitListPage /></S>,                                                  errorElement: <RouteError /> },
      { path: ROUTES.UNIT_CREATE, element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><AddUnitPage /></RoleRoute></S>, errorElement: <RouteError /> },
      { path: ROUTES.UNIT_DETAIL, element: <S><UnitDetailPage /></S>,                                               errorElement: <RouteError /> },
      { path: ROUTES.UNIT_EDIT,   element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><EditUnitPage /></RoleRoute></S>, errorElement: <RouteError /> },

      { path: ROUTES.VISITORS,         element: <S><VisitorLogsPage /></S>,                                                         errorElement: <RouteError /> },
      { path: ROUTES.VISITOR_DETAIL,   element: <S><VisitorDetailPage /></S>,                                                       errorElement: <RouteError /> },
      { path: ROUTES.VISITORS_INVITES, element: <S><PreApprovedVisitorsPage /></S>,                                                  errorElement: <RouteError /> },
      { path: ROUTES.VISITORS_SOS,     element: <S><RoleRoute allowedRoles={SECURITY_ROLES}><SOSDashboardPage /></RoleRoute></S>,   errorElement: <RouteError /> },

      { path: ROUTES.COMPLAINTS,          element: <S><ComplaintListPage /></S>,                                                       errorElement: <RouteError /> },
      { path: ROUTES.COMPLAINT_CREATE,    element: <S><CreateComplaintPage /></S>,                                                     errorElement: <RouteError /> },
      { path: ROUTES.COMPLAINT_DETAIL,    element: <S><ComplaintDetailPage /></S>,                                                     errorElement: <RouteError /> },
      { path: ROUTES.COMPLAINT_DASHBOARD, element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><ComplaintDashboardPage /></RoleRoute></S>, errorElement: <RouteError /> },
      { path: ROUTES.COMPLAINT_KANBAN,    element: <S><ComplaintKanbanPage /></S>,                                                     errorElement: <RouteError /> },

      { path: ROUTES.FINANCIALS,          element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><FinancialDashboardPage /></RoleRoute></S>, errorElement: <RouteError /> },
      { path: ROUTES.FINANCIALS_INVOICES, element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><InvoiceListPage /></RoleRoute></S>,        errorElement: <RouteError /> },
      { path: ROUTES.FINANCIALS_INVOICE,  element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><InvoiceDetailPage /></RoleRoute></S>,      errorElement: <RouteError /> },
      { path: ROUTES.FINANCIALS_PAYMENTS, element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><PaymentsPage /></RoleRoute></S>,           errorElement: <RouteError /> },
      { path: ROUTES.FINANCIALS_EXPENSES, element: <S><RoleRoute allowedRoles={FINANCIAL_ROLES}><ExpensesPage /></RoleRoute></S>,           errorElement: <RouteError /> },
      { path: ROUTES.FINANCIALS_HEADS,    element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><MaintenanceHeadsPage /></RoleRoute></S>,       errorElement: <RouteError /> },

      { path: ROUTES.ADMIN_USERS,      element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><UserManagementPage /></RoleRoute></S>, errorElement: <RouteError /> },
      { path: ROUTES.ADMIN_AUDIT_LOGS, element: <S><RoleRoute allowedRoles={ADMIN_ROLES}><AuditLogsPage /></RoleRoute></S>,     errorElement: <RouteError /> },

      { path: ROUTES.AMENITIES,  element: <S><AmenitiesPage /></S>,  errorElement: <RouteError /> },
      { path: ROUTES.STAFF,      element: <S><StaffPage /></S>,      errorElement: <RouteError /> },
      { path: ROUTES.ASSETS,     element: <S><AssetsPage /></S>,     errorElement: <RouteError /> },
      { path: ROUTES.NOTICES,    element: <S><NoticesPage /></S>,    errorElement: <RouteError /> },
      { path: ROUTES.MEETINGS,   element: <S><MeetingsPage /></S>,   errorElement: <RouteError /> },
      { path: ROUTES.COMPLIANCE, element: <S><CompliancePage /></S>, errorElement: <RouteError /> },
      { path: ROUTES.SETTINGS,   element: <div className="p-8 text-center text-muted-foreground"><p className="text-base font-medium">Settings</p><p className="mt-1 text-sm opacity-60">Coming soon.</p></div>, errorElement: <RouteError /> },
    ],
  },
]);
