import { useNavigate } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';
import { QUICK_ACTIONS } from '../constants/dashboard.widgets';
import type { QuickAction } from '../types/dashboard.types';

export function useQuickActions() {
  const navigate = useNavigate();
  const { can }  = usePermissions();

  const actions: QuickAction[] = QUICK_ACTIONS.filter(
    (a) => !a.permission || can(a.permission),
  );

  const handleAction = (href: string) => void navigate(href);

  return { actions, handleAction };
}
