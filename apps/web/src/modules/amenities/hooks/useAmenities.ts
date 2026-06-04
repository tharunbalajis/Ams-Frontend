import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { amenityKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { amenitiesApi } from '@/api/amenities.api';
import { toast } from '@/utils/toast';
import type { AmenityFilters, CreateAmenityDto, UpdateAmenityDto } from '@/api/amenities.api';

export function useAmenities(params?: AmenityFilters) {
  return useQuery({
    queryKey:  amenityKeys.list(params),
    queryFn:   () => amenitiesApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useAmenity(id: string) {
  return useQuery({
    queryKey:  amenityKeys.detail(id),
    queryFn:   () => amenitiesApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateAmenity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAmenityDto) => amenitiesApi.create(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: amenityKeys.lists() });
      toast.success('Amenity created.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useUpdateAmenity(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateAmenityDto) => amenitiesApi.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: amenityKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: amenityKeys.lists() });
      toast.success('Amenity updated.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useDeleteAmenity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => amenitiesApi.remove(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: amenityKeys.lists() });
      toast.success('Amenity deleted.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}
