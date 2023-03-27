import { useContext } from 'react'
import { FlagType, InovaFeatureFlagContext } from '../providers/InovaFeatureFlagProvider'

type FeatureFlagValue = FlagType

type FeatureFlagRecord = Record<string, FeatureFlagValue>

export function useInovaFlag<T extends FeatureFlagRecord>(
  key: keyof T,
  defaultValue: FeatureFlagValue,
): FeatureFlagValue {
  const { useInovaFlag: useFlag } = useContext(InovaFeatureFlagContext)

  return useFlag(key as string, defaultValue)
}
