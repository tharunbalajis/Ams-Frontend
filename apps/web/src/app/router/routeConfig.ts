export const ROUTES = {
  // Auth
  LOGIN: '/login',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Residents
  RESIDENTS:        '/residents',
  RESIDENT_CREATE:  '/residents/create',
  RESIDENT_DETAIL:  '/residents/:id',
  RESIDENT_EDIT:    '/residents/:id/edit',
  RESIDENT_PROFILE: '/residents/:id/profile',

  // Units
  UNITS:       '/units',
  UNIT_CREATE: '/units/create',
  UNIT_DETAIL: '/units/:id',
  UNIT_EDIT:   '/units/:id/edit',

  // Visitors
  VISITORS:         '/visitors',
  VISITOR_DETAIL:   '/visitors/:id',
  VISITORS_INVITES: '/visitors/invites',
  VISITORS_SOS:     '/visitors/sos',

  // Complaints
  COMPLAINTS:          '/complaints',
  COMPLAINT_CREATE:    '/complaints/create',
  COMPLAINT_DETAIL:    '/complaints/:id',
  COMPLAINT_DASHBOARD: '/complaints/dashboard',
  COMPLAINT_KANBAN:    '/complaints/kanban',

  // Financials
  FINANCIALS:          '/financials',
  FINANCIALS_INVOICES: '/financials/invoices',
  FINANCIALS_INVOICE:  '/financials/invoices/:id',
  FINANCIALS_PAYMENTS: '/financials/payments',
  FINANCIALS_EXPENSES: '/financials/expenses',
  FINANCIALS_HEADS:    '/financials/heads',

  // Admin
  ADMIN_USERS:      '/admin/users',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',

  // Out-of-scope (retained for sidebar nav)
  AMENITIES:  '/amenities',
  STAFF:      '/staff',
  ASSETS:     '/assets',
  NOTICES:    '/notices',
  MEETINGS:   '/meetings',
  COMPLIANCE: '/compliance',
  SETTINGS:   '/settings',
} as const;

export type RouteKey  = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export function buildRoute(path: RoutePath, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path as string,
  );
}
