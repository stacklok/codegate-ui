import { useQuery } from '@tanstack/react-query'
import { v1GetProviderEndpointOptions } from '@/api/generated/@tanstack/react-query.gen'
import { AddProviderEndpointRequest, ProviderType } from '@/api/generated'
import { useEffect, useState } from 'react'

export function useProvider(providerName: string) {
  const [provider, setProvider] = useState<AddProviderEndpointRequest>({
    name: '',
    description: '',
    auth_type: undefined,
    provider_type: ProviderType.OPENAI,
    endpoint: '',
    api_key: '',
  })

  const { data, isPending, isError } = useQuery({
    ...v1GetProviderEndpointOptions({ path: { provider_name: providerName } }),
  })

  useEffect(() => {
    if (data) {
      setProvider(data)
    }
  }, [data])

  return { isPending, isError, provider, setProvider }
}
