export const settingsKeys = {
  all:          ['settings'] as const,
  organization: () => [...settingsKeys.all, 'organization']  as const,
  profile:      () => [...settingsKeys.all, 'profile']       as const,
  notifications: () => [...settingsKeys.all, 'notifications'] as const,
  security:     () => [...settingsKeys.all, 'security']      as const,
};
