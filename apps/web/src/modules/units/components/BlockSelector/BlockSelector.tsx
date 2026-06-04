import { useQuery } from '@tanstack/react-query';
import { SelectField } from '@ams/ui';
import { unitsApi } from '../../api/units.api';
import { unitKeys } from '@/lib/queryKeys/units.keys';
import { useAuth } from '@/hooks/useAuth';

export interface BlockSelectorProps {
  value?:        string;
  onValueChange: (value: string) => void;
  disabled?:     boolean;
  placeholder?:  string;
}

export function BlockSelector({ value, onValueChange, disabled, placeholder = 'Select block' }: BlockSelectorProps) {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: unitKeys.blocks(),
    queryFn:  () => unitsApi.getBlocks({ society_id: user?.society_id }),
  });

  // block_id is the PK, block_name is the display name
  const options = (data?.data ?? [])
    .filter((b) => b.block_id != null)
    .map((b) => ({ label: b.block_name, value: String(b.block_id) }));

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
