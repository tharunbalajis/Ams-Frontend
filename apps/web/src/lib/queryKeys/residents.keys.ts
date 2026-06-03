export const residentKeys = {
<<<<<<< HEAD
  all:      ['residents']                                                              as const,
  lists:    ()           => [...residentKeys.all, 'list']                             as const,
  list:     (params?:    Record<string, unknown>) => [...residentKeys.lists(), params] as const,
  details:  ()           => [...residentKeys.all, 'detail']                           as const,
  detail:   (id: string) => [...residentKeys.details(), id]                           as const,
  vehicles: {
    list:   (residentId: string) => [...residentKeys.all, 'vehicles', residentId]     as const,
    detail: (id: string)         => [...residentKeys.all, 'vehicles', 'detail', id]   as const,
  },
  pets: {
    list:   (residentId: string) => [...residentKeys.all, 'pets', residentId]         as const,
    detail: (id: string)         => [...residentKeys.all, 'pets', 'detail', id]       as const,
  },
  lease: {
    detail: (residentId: string) => [...residentKeys.all, 'lease', residentId]        as const,
  },
=======
  all:     ['residents'] as const,
  lists:   () => [...residentKeys.all, 'list']          as const,
  list:    (params?: unknown) => [...residentKeys.lists(), params]  as const,
  details: () => [...residentKeys.all, 'detail']        as const,
  detail:  (id: string) => [...residentKeys.details(), id] as const,
>>>>>>> d852c2e (final)
};
