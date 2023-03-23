import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'

const DEFAULT_API_URL = 'https://inovaebiz.com.br/'
const DEFAULT_CACHE_DURATION = 3600 * 24
const DEFAULT_CACHE_RESULTS = true
const DEFAULT_AUTO_REFETCH = false

type FlagType = boolean

interface FeatureFlag {
  key: string
  value: FlagType
  description: string
}

interface FeatureFlagResponse {
  featureFlags: FeatureFlag[]
}

interface InovaFeatureFlagContextType {
  useInovaFlag: (key: string, defaultValue: FlagType) => FlagType
}

export interface InovaFeatureFlagOptions {
  url?: string
  autoRefetch?: boolean
  cacheResults?: boolean
  cacheDataForSeconds?: number
}

const defaultOptions: InovaFeatureFlagOptions = {
  url: DEFAULT_API_URL,
  autoRefetch: DEFAULT_AUTO_REFETCH,
  cacheResults: DEFAULT_CACHE_RESULTS,
  cacheDataForSeconds: DEFAULT_CACHE_DURATION,
}

export interface IFlag {
  key: string
  value: FlagType
}

export const InovaFeatureFlagContext = createContext<InovaFeatureFlagContextType>({} as InovaFeatureFlagContextType)

export const InovaFeatureFlagProvider: React.FC<{
  children: React.ReactNode
  sdkKey: string
  options?: InovaFeatureFlagOptions
}> = ({ children, sdkKey, options: userOptions }) => {
  const [flags, setFlags] = useState<IFlag[]>([])
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null)

  const options = useMemo(() => userOptions ?? defaultOptions, [userOptions])
  const headers = new Headers({ Authorization: `Bearer ${sdkKey}` })

  const fetchFeatureFlags = useCallback(async () => {
    if (!headers) {
      return new Error('No SDK key provided')
    }
    try {
      const response = await fetch(options.url!, {
        method: 'POST',
        headers,
      })

      const data = (await response.json()) as FeatureFlagResponse

      setFlags(data.featureFlags)
      setLastFetchedAt(new Date())

      return data.featureFlags
    } catch {
      return []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const useInovaFlag = useCallback(
    (key: string, defaultValue: FlagType): FlagType => {
      const value = flags.find((flag) => flag.key === key)?.value

      return value ?? defaultValue
    },
    [flags],
  )

  useEffect(() => {
    if (options.autoRefetch && lastFetchedAt) {
      const cacheDuration = options.cacheDataForSeconds! * 1000
      const elapsedTime = new Date().getTime() - lastFetchedAt.getTime()

      if (elapsedTime > cacheDuration) {
        fetchFeatureFlags()
      }
    } else {
      fetchFeatureFlags()
    }
  }, [options, lastFetchedAt, fetchFeatureFlags])

  return <InovaFeatureFlagContext.Provider value={{ useInovaFlag }}>{children}</InovaFeatureFlagContext.Provider>
}
