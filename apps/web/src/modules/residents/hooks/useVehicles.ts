import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { residentKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { vehiclesApi } from '../api/vehicles.api';
import { toast } from '@/utils/toast';
import type { ID } from '@/types/common.types';
import type { CreateVehiclePayload, UpdateVehiclePayload } from '../types/vehicle.types';

export function useVehicles(residentId: ID) {
  return useQuery({
    queryKey:  residentKeys.vehicles.list(residentId),
    queryFn:   () => vehiclesApi.getByResident(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!residentId,
  });
}

export function useCreateVehicle(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVehiclePayload) => vehiclesApi.create(residentId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.vehicles.list(residentId) });
      toast.success('Vehicle added.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateVehicle(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ vehicleId, payload }: { vehicleId: ID; payload: UpdateVehiclePayload }) =>
      vehiclesApi.update(residentId, vehicleId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.vehicles.list(residentId) });
      toast.success('Vehicle updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useDeleteVehicle(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vehicleId: ID) => vehiclesApi.remove(residentId, vehicleId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.vehicles.list(residentId) });
      toast.success('Vehicle removed.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}
