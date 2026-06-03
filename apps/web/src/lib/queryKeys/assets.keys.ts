export const assetKeys = {
  all:      ['assets'] as const,
  lists:    () => [...assetKeys.all, 'list']             as const,
  list:     (params?: unknown) => [...assetKeys.lists(), params]   as const,
  details:  () => [...assetKeys.all, 'detail']           as const,
  detail:   (id: string) => [...assetKeys.details(), id] as const,
  maintenance: (id: string) => [...assetKeys.all, 'maintenance', id] as const,
};
