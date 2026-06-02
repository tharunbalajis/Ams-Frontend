export const FEATURES = {
  DARK_MODE:       'dark_mode',
  NOTIFICATIONS:   'notifications',
  ANALYTICS:       'analytics',
  ADVANCED_SEARCH: 'advanced_search',
  BULK_ACTIONS:    'bulk_actions',
  EXPORT_PDF:      'export_pdf',
  EXPORT_EXCEL:    'export_excel',
} as const;

export type FeatureFlag = (typeof FEATURES)[keyof typeof FEATURES];

export type FeatureFlagMap = Record<FeatureFlag, boolean>;

export const DEFAULT_FEATURES: FeatureFlagMap = {
  dark_mode:       true,
  notifications:   true,
  analytics:       false,
  advanced_search: false,
  bulk_actions:    false,
  export_pdf:      false,
  export_excel:    false,
};
