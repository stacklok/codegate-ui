import {
  PaginatedMessagesResponse,
  AlertTriggerType,
  ConversationSummary,
} from '@/api/generated'
import { mockConversationSummary } from './conversation-summary.mock'
import { HttpResponse, HttpResponseResolver } from 'msw'

export const buildFilterablePaginatedMessagesHandler = (
  {
    include,
  }: {
    include: {
      no_alerts?: boolean
      [AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER]?: boolean
      [AlertTriggerType.CODEGATE_PII]?: boolean
      [AlertTriggerType.CODEGATE_SECRETS]?: boolean
    }
  } = {
    include: {
      no_alerts: true,
      [AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER]: true,
      [AlertTriggerType.CODEGATE_PII]: true,
      [AlertTriggerType.CODEGATE_SECRETS]: true,
    },
  }
): HttpResponseResolver => {
  const noAlerts = Array.from({ length: 10 }).map(() =>
    mockConversationSummary({
      alertsSummary: {
        secrets: 0,
        total_alerts: 0,
        malicious_packages: 0,
        pii: 0,
      },
    })
  )
  const secrets = Array.from({ length: 10 }).map(() =>
    mockConversationSummary({
      alertsSummary: {
        secrets: 10,
        total_alerts: 10,
        malicious_packages: 0,
        pii: 0,
      },
    })
  )
  const malicious = Array.from({ length: 10 }).map(() =>
    mockConversationSummary({
      alertsSummary: {
        secrets: 0,
        total_alerts: 10,
        malicious_packages: 10,
        pii: 0,
      },
    })
  )
  const pii = Array.from({ length: 10 }).map(() =>
    mockConversationSummary({
      alertsSummary: {
        secrets: 0,
        total_alerts: 10,
        malicious_packages: 0,
        pii: 10,
      },
    })
  )

  const results: ConversationSummary[] = []

  if (include.no_alerts) {
    results.push(...noAlerts)
  }
  if (include[AlertTriggerType.CODEGATE_SECRETS]) {
    results.push(...secrets)
  }
  if (include[AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER]) {
    results.push(...malicious)
  }
  if (include[AlertTriggerType.CODEGATE_PII]) {
    results.push(...pii)
  }

  return ({ request }) => {
    const url = new URL(request.url)
    const trigger_type = url.searchParams.get(
      'filter_by_alert_trigger_types'
    ) as AlertTriggerType

    const filteredResults = [...results].filter((r) => {
      if (trigger_type === AlertTriggerType.CODEGATE_SECRETS) {
        return r.alerts_summary.secrets > 0
      }
      if (trigger_type === AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER) {
        return r.alerts_summary.malicious_packages > 0
      }
      if (trigger_type === AlertTriggerType.CODEGATE_PII) {
        return r.alerts_summary.pii > 0
      }
    })

    const response: PaginatedMessagesResponse = {
      data: filteredResults,
      limit: 50,
      offset: 0,
      total: filteredResults.length,
    }

    return HttpResponse.json(response)
  }
}
