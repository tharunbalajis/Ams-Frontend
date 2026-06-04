export const unitKeys = {
  all: ['units'] as const,

  lists: () =>
    [...unitKeys.all, 'list'] as const,

  list: (params?: Record<string, unknown>) =>
    [...unitKeys.lists(), params] as const,

  details: () =>
    [...unitKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...unitKeys.details(), id] as const,

  residents: (unitId: string) =>
    [...unitKeys.detail(unitId), 'residents'] as const,

  maintenance: (unitId: string) =>
    [...unitKeys.detail(unitId), 'maintenance'] as const,

  analytics: () =>
    [...unitKeys.all, 'analytics'] as const,
};