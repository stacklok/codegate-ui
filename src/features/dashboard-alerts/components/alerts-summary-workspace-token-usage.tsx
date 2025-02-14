import { Download01, Upload01 } from '@untitled-ui/icons-react'
import { AlertsSummary } from './alerts-summary'
import { useQueryGetWorkspaceTokenUsage } from '../hooks/use-query-get-workspace-token-usage'

export function AlertsSummaryWorkspaceTokenUsage() {
  const { data, isPending } = useQueryGetWorkspaceTokenUsage({
    select: (data) => data.token_usage,
  })

  return (
    <AlertsSummary
      isPending={isPending}
      title="Workspace token usage"
      statistics={[
        {
          count: data?.input_tokens ?? 0,
          id: 'usage-input-tokens',
          Icon: Upload01,
        },
        {
          count: data?.output_tokens ?? 0,
          id: 'usage-output-tokens',
          Icon: Download01,
        },
      ]}
    />
  )
}
