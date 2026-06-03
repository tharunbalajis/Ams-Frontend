export const unitKeys = {
  all:      ['units']                                                               as const,
  lists:    ()           => [...unitKeys.all, 'list']                              as const,
  list:     (params?:    Record<string, unknown>) => [...unitKeys.lists(), params]  as const,
  details:  ()           => [...unitKeys.all, 'detail']                            as const,
  detail:   (id: string) => [...unitKeys.details(), id]                            as const,
  blocks:   ()           => [...unitKeys.all, 'blocks']                            as const,
  ownership: {
    detail: (unitId: string) => [...unitKeys.all, 'ownership', unitId]             as const,
  },
};
