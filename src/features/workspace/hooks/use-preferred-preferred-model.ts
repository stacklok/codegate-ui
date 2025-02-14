import { MuxRule, V1GetWorkspaceMuxesData } from '@/api/generated'
import { v1GetWorkspaceMuxesOptions } from '@/api/generated/@tanstack/react-query.gen'
import { useFormState } from '@/hooks/useFormState'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type ModelRule = Omit<MuxRule, 'matcher_type' | 'matcher'> & {}

const DEFAULT_STATE = {
  provider_id: '',
  model: '',
} as const satisfies ModelRule

const usePreferredModel = (options: {
  path: {
    workspace_name: string
  }
}) => {
  return useQuery({
    ...v1GetWorkspaceMuxesOptions(options),
  })
}

export const usePreferredModelWorkspace = (workspaceName: string) => {
  const options: V1GetWorkspaceMuxesData &
    Omit<V1GetWorkspaceMuxesData, 'body'> = useMemo(
    () => ({
      path: { workspace_name: workspaceName },
    }),
    [workspaceName]
  )
  const { data, isPending } = usePreferredModel(options)
  const providerModel = data?.[0]
  const formState = useFormState<{ preferredModel: ModelRule }>({
    preferredModel: providerModel ?? DEFAULT_STATE,
  })

  return { isPending, formState }
}
