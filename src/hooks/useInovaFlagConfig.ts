import { useContext } from 'react';
import { InovaFeatureFlagContext, InovaFeatureFlagOptions } from '../providers/InovaFeatureFlagProvider';

type ConfigFunction = (key: string, options?: InovaFeatureFlagOptions) => void;

export function useInovaFlagConfig(): ConfigFunction {
  const { config } = useContext(InovaFeatureFlagContext);
  return config;
}
