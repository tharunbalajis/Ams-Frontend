export const ROUTES = {
  // Auth
  LOGIN: '/login',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Residents
  RESIDENTS: '/residents',
  RESIDENT_DETAIL: '/residents/:id',

  // Units
  UNITS: '/units',
  UNIT_DETAIL: '/units/:id',

  // Visitors
  VISITORS: '/visitors',
  VISITOR_DETAIL: '/visitors/:id',

  // Complaints
  COMPLAINTS: '/complaints',
  COMPLAINT_DETAIL: '/complaints/:id',

  // Financials
  FINANCIALS: '/financials',
  FINANCIALS_INVOICES: '/financials/invoices',
  FINANCIALS_PAYMENTS: '/financials/payments',
  FINANCIALS_EXPENSES: '/financials/expenses',

  // Amenities
  AMENITIES: '/amenities',

  // Staff
  STAFF: '/staff',

  // Assets
  ASSETS: '/assets',

  // Notices
  NOTICES: '/notices',

  // Meetings
  MEETINGS: '/meetings',

  // Compliance
  COMPLIANCE: '/compliance',

  // Settings
  SETTINGS: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export function buildRoute(
  path: RoutePath,
  params: Record<string, string>,
): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    path as string,
  );
}
