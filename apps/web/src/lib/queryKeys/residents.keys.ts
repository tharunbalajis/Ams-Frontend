export const residentKeys = {
  all:     ['residents'] as const,
  lists:   () => [...residentKeys.all, 'list']             as const,
  list:    (params?: unknown) => [...residentKeys.lists(), params]   as const,
  details: () => [...residentKeys.all, 'detail']           as const,
  detail:  (id: string) => [...residentKeys.details(), id] as const,
  dashboard: () => [...residentKeys.all, 'dashboard']      as const,
  summary:   () => [...residentKeys.all, 'summary']         as const,

  lease: {
    all:    (residentId: string) => [...residentKeys.all, 'lease', residentId]         as const,
    detail: (residentId: string) => [...residentKeys.all, 'lease', residentId, 'active'] as const,
  },

  pets: {
    all:  (residentId: string) => [...residentKeys.all, 'pets', residentId]      as const,
    list: (residentId: string) => [...residentKeys.all, 'pets', residentId, 'list'] as const,
  },

  vehicles: {
    all:  (residentId: string) => [...residentKeys.all, 'vehicles', residentId]      as const,
    list: (residentId: string) => [...residentKeys.all, 'vehicles', residentId, 'list'] as const,
  },
};
