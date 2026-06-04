import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assetKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { assetsApi } from '@/api/assets.api';
import { toast } from '@/utils/toast';
import type { AssetFilters, CreateAssetDto, UpdateAssetDto } from '@/api/assets.api';

export function useAssets(params?: AssetFilters) {
  return useQuery({
    queryKey:  assetKeys.list(params),
    queryFn:   () => assetsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useAsset(id: string) {
  return useQuery({
    queryKey:  assetKeys.detail(id),
    queryFn:   () => assetsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAssetDto) => assetsApi.create(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: assetKeys.lists() });
      toast.success('Asset created.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useUpdateAsset(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateAssetDto) => assetsApi.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: assetKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: assetKeys.lists() });
      toast.success('Asset updated.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useDeleteAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => assetsApi.remove(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: assetKeys.lists() });
      toast.success('Asset deleted.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}
