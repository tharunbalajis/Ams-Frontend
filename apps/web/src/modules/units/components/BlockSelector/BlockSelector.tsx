import { useQuery } from '@tanstack/react-query';
import { SelectField } from '@ams/ui';
import { unitsApi } from '../../api/units.api';
import { unitKeys } from '@/lib/queryKeys/units.keys';

export interface BlockSelectorProps {
  value?:        string;
  onValueChange: (value: string) => void;
  disabled?:     boolean;
  placeholder?:  string;
}

export function BlockSelector({ value, onValueChange, disabled, placeholder = 'Select block' }: BlockSelectorProps) {
  const { data, isLoading } = useQuery({
    queryKey: unitKeys.blocks(),
    queryFn:  () => unitsApi.getBlocks(),
  });

  const options = (data?.data ?? []).map((b) => ({ label: b.label, value: b.id }));

  return (
    <SelectField
      value={value}
      onValueChange={onValueChange}
      options={options}
      placeholder={isLoading ? 'Loading...' : placeholder}
      disabled={disabled || isLoading}
    />
  );
}
