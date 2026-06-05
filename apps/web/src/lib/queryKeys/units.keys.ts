export const unitKeys = {
  all: ['units'] as const,

  lists: () =>
    [...unitKeys.all, 'list'] as const,

  list: (params?: unknown) =>
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

  blocks: () =>
    [...unitKeys.all, 'blocks'] as const,

  summary: () =>
    [...unitKeys.all, 'summary'] as const,

  ownership: {
    all:    (unitId: string) => [...unitKeys.detail(unitId), 'ownership']          as const,
    detail: (unitId: string) => [...unitKeys.detail(unitId), 'ownership', 'current'] as const,
  },
};