declare module '@inovaebiz/inova-feature-flag' {
  interface FeatureFlag {
    key: string;
    value: boolean | string;
    description: string;
  }

  interface InovaFeatureFlagOptions {
    url?: string;
    autoRefetch?: boolean;
    cacheResults?: boolean;
    cacheDataForSeconds?: number;
  }

  interface InovaFeatureFlagContextType {
    useInovaFlag: (key: string, defaultValue: boolean | string) => boolean | string;
  }

  export const InovaFeatureFlagProvider: React.FC<{
    children: React.ReactNode;
    sdkKey: string;
    options?: InovaFeatureFlagOptions;
  }>;

  export const InovaFeatureFlagContext: React.Context<InovaFeatureFlagContextType>;
  export function useInovaFlag(
    key: string,
    defaultValue: boolean | string
  ): boolean | string;
}
