export const visitorKeys = {
  all:      ['visitors']                                                                  as const,
  lists:    ()           => [...visitorKeys.all, 'list']                                 as const,
  list:     (params?:    Record<string, unknown>) => [...visitorKeys.lists(), params]     as const,
  details:  ()           => [...visitorKeys.all, 'detail']                               as const,
  detail:   (id: string) => [...visitorKeys.details(), id]                               as const,
  invites: {
    all:    ()           => ['invites']                                                   as const,
    lists:  ()           => ['invites', 'list']                                          as const,
    list:   (params?:    Record<string, unknown>) => ['invites', 'list', params]         as const,
    detail: (id: string) => ['invites', 'detail', id]                                    as const,
  },
  sos: {
    all:    ()           => ['sos']                                                       as const,
    lists:  ()           => ['sos', 'list']                                              as const,
    list:   (params?:    Record<string, unknown>) => ['sos', 'list', params]             as const,
    detail: (id: string) => ['sos', 'detail', id]                                        as const,
  },
  dashboard: () => [...visitorKeys.all, 'dashboard']                                     as const,
};
