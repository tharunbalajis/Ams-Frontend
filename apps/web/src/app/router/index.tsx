import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routeConfig';
import { ProtectedRoute } from '@/app/guards/ProtectedRoute';
import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { AuthLayout } from '@/app/layouts/AuthLayout';

// Module pages — imported from module barrels in Phase 2
// Placeholder route elements used until Phase 2 implementations are available

const Placeholder = ({ name }: { name: string }) => (
  <div className="p-8 text-muted-foreground">
    <p className="text-sm font-medium">{name}</p>
    <p className="text-xs mt-1">Phase 2 — implementation pending</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Placeholder name="Login" />,
      },
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
      { path: ROUTES.DASHBOARD, element: <Placeholder name="Dashboard" /> },
      { path: ROUTES.RESIDENTS, element: <Placeholder name="Residents List" /> },
      { path: ROUTES.RESIDENT_DETAIL, element: <Placeholder name="Resident Detail" /> },
      { path: ROUTES.UNITS, element: <Placeholder name="Units List" /> },
      { path: ROUTES.UNIT_DETAIL, element: <Placeholder name="Unit Detail" /> },
      { path: ROUTES.VISITORS, element: <Placeholder name="Visitors List" /> },
      { path: ROUTES.VISITOR_DETAIL, element: <Placeholder name="Visitor Detail" /> },
      { path: ROUTES.COMPLAINTS, element: <Placeholder name="Complaints List" /> },
      { path: ROUTES.COMPLAINT_DETAIL, element: <Placeholder name="Complaint Detail" /> },
      { path: ROUTES.FINANCIALS, element: <Placeholder name="Financials Overview" /> },
      { path: ROUTES.FINANCIALS_INVOICES, element: <Placeholder name="Invoices" /> },
      { path: ROUTES.FINANCIALS_PAYMENTS, element: <Placeholder name="Payments" /> },
      { path: ROUTES.FINANCIALS_EXPENSES, element: <Placeholder name="Expenses" /> },
      { path: ROUTES.AMENITIES, element: <Placeholder name="Amenities" /> },
      { path: ROUTES.STAFF, element: <Placeholder name="Staff" /> },
      { path: ROUTES.ASSETS, element: <Placeholder name="Assets" /> },
      { path: ROUTES.NOTICES, element: <Placeholder name="Notices" /> },
      { path: ROUTES.MEETINGS, element: <Placeholder name="Meetings" /> },
      { path: ROUTES.COMPLIANCE, element: <Placeholder name="Compliance" /> },
      { path: ROUTES.SETTINGS, element: <Placeholder name="Settings" /> },
    ],
  },
]);
