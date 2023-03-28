import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'

const DEFAULT_API_URL = 'https://inovaebiz.com.br/'
const DEFAULT_CACHE_DURATION = 3600 * 24
const DEFAULT_CACHE_RESULTS = true
const DEFAULT_AUTO_REFETCH = false

export type FlagType = boolean | string | number | string[] | number[] | boolean[]

interface FeatureFlag {
  key: string
  value: FlagType
  description: string
}

interface FeatureFlagResponse {
  success: boolean
  data: {
    featureFlags: FeatureFlag[]
  }
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

export const InovaFeatureFlagContext = createContext<InovaFeatureFlagContextType>({} as InovaFeatureFlagContextType)

export const InovaFeatureFlagProvider: React.FC<{
  children: React.ReactNode
  sdkKey: string
  options?: InovaFeatureFlagOptions
}> = ({ children, sdkKey, options: userOptions }) => {
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
      if (data && data.success && data.data.featureFlags) {
        setFlags(data.data.featureFlags)
        setLastFetchedAt(new Date())
        setIsLoading(false)
        return data.data.featureFlags
      } else {
        setIsLoading(false)
        return []
      }
    } catch {
      setIsLoading(false)
      return []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const useInovaFlag = useCallback(
    (key: string, defaultValue: FlagType): FlagType => {
      if (isLoading) {
        return defaultValue
      }

      const value = flags.find((flag) => flag.key === key)?.value

      if (typeof value !== 'undefined' && typeof value !== typeof defaultValue && !isLoading && flags.length > 0) {
        console.log(` ⚠️ Flag ${key} is of type ${typeof value} but you are trying to use it as ${typeof defaultValue}`)
        return defaultValue
      }

      return value ?? defaultValue
    },
    [flags, isLoading],
  )

  useEffect(() => {
    if (options.autoRefetch && lastFetchedAt) {
      const cacheDuration = options.cacheDataForSeconds! * 1000
      const elapsedTime = new Date().getTime() - lastFetchedAt.getTime()

      if (elapsedTime > cacheDuration) {
        fetchFeatureFlags()
      }
    } else if (flags.length < 1 && lastFetchedAt === null) {
      fetchFeatureFlags()
    }
  }, [options, lastFetchedAt, fetchFeatureFlags, flags])

  return <InovaFeatureFlagContext.Provider value={{ useInovaFlag }}>{children}</InovaFeatureFlagContext.Provider>
}
