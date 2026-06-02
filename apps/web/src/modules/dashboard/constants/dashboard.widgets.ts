import { ROUTES } from '@/config/routes';
import type { QuickAction } from '../types/dashboard.types';

export const WIDGET_KEYS = {
  RESIDENT_COUNT:      'resident_count',
  OCCUPIED_UNITS:      'occupied_units',
  PENDING_COMPLAINTS:  'pending_complaints',
  OPEN_VISITORS:       'open_visitors',
  MONTHLY_COLLECTIONS: 'monthly_collections',
  PENDING_PAYMENTS:    'pending_payments',
  STAFF_COUNT:         'staff_count',
  ASSET_STATUS:        'asset_status',
  UPCOMING_MEETINGS:   'upcoming_meetings',
} as const;

export type WidgetKey = (typeof WIDGET_KEYS)[keyof typeof WIDGET_KEYS];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    key:         'add_resident',
    label:       'Add Resident',
    description: 'Register a new resident',
    href:        ROUTES.RESIDENTS,
    permission:  'residents:create',
  },
  {
    key:         'register_visitor',
    label:       'Register Visitor',
    description: 'Log an incoming visitor',
    href:        ROUTES.VISITORS,
    permission:  'visitors:create',
  },
  {
    key:         'create_complaint',
    label:       'Create Complaint',
    description: 'File a new complaint',
    href:        ROUTES.COMPLAINTS,
    permission:  'complaints:view',
  },
  {
    key:         'create_invoice',
    label:       'Create Invoice',
    description: 'Generate a payment invoice',
    href:        ROUTES.FINANCIALS_INVOICES,
    permission:  'financials:manage',
  },
  {
    key:         'book_amenity',
    label:       'Book Amenity',
    description: 'Reserve a community amenity',
    href:        ROUTES.AMENITIES,
    permission:  'amenities:manage',
  },
  {
    key:         'create_notice',
    label:       'Create Notice',
    description: 'Post a community announcement',
    href:        ROUTES.NOTICES,
    permission:  'notices:manage',
  },
  {
    key:         'create_meeting',
    label:       'Schedule Meeting',
    description: 'Plan a new meeting',
    href:        ROUTES.MEETINGS,
    permission:  'meetings:manage',
  },
];
