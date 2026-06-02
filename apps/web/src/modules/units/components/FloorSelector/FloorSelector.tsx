import { useQuery } from '@tanstack/react-query';
import { SelectField } from '@ams/ui';
import { floorApi } from '../../api/floor.api';

export interface FloorSelectorProps {
  blockId?:      string;
  value?:        number;
  onValueChange: (value: number) => void;
  disabled?:     boolean;
  placeholder?:  string;
}

export function FloorSelector({ blockId, value, onValueChange, disabled, placeholder = 'Select floor' }: FloorSelectorProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['units', 'blocks', blockId, 'floors'],
    queryFn:  () => floorApi.getFloors(blockId!),
    enabled:  !!blockId,
  });

  const options = (data?.data ?? []).map((f) => ({ label: f.label, value: String(f.floorNumber) }));

  return (
    <SelectField
      value={value !== undefined ? String(value) : undefined}
      onValueChange={(v) => onValueChange(Number(v))}
      options={options}
      placeholder={!blockId ? 'Select block first' : isLoading ? 'Loading...' : placeholder}
      disabled={disabled || !blockId || isLoading}
    />
  );
}
