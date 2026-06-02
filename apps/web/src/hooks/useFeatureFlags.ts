import { env } from '@/config/env';
import { DEFAULT_FEATURES, FEATURES, type FeatureFlag, type FeatureFlagMap } from '@/config/featureFlags';

const resolvedFlags: FeatureFlagMap = {
  ...DEFAULT_FEATURES,
  analytics: env.enableAnalytics,
};

export function useFeatureFlags() {
  const isEnabled = (flag: FeatureFlag): boolean => resolvedFlags[flag] ?? false;
  const getAll    = (): FeatureFlagMap => resolvedFlags;

  return { isEnabled, getAll, FEATURES };
}
