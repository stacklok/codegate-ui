import { http, HttpResponse } from 'msw'
import mockedAlerts from '@/mocks/msw/fixtures/GET_ALERTS.json'
import mockedWorkspaces from '@/mocks/msw/fixtures/GET_WORKSPACES.json'
import mockedProviders from '@/mocks/msw/fixtures/GET_PROVIDERS.json'
import mockedProvidersModels from '@/mocks/msw/fixtures/GET_PROVIDERS_MODELS.json'
import {
  AlertSummary,
  AlertTriggerType,
  PaginatedMessagesResponse,
  ProviderType,
} from '@/api/generated'
import { mockConversation } from './mockers/conversation.mock'
import { mswEndpoint } from '@/test/msw-endpoint'

export const handlers = [
  http.get(mswEndpoint('/health'), () =>
    HttpResponse.json({
      current_version: 'foo',
      latest_version: 'bar',
      is_latest: false,
      error: null,
    })
  ),
  http.get(mswEndpoint('/api/v1/version'), () =>
    HttpResponse.json({ status: 'healthy' })
  ),
  http.get(mswEndpoint('/api/v1/workspaces/active'), () =>
    HttpResponse.json({
      workspaces: [
        {
          name: 'my-awesome-workspace',
          is_active: true,
          last_updated: new Date(Date.now()).toISOString(),
        },
      ],
    })
  ),
  http.get(
    mswEndpoint('/api/v1/workspaces/:workspace_name/messages'),
    ({ request }) => {
      const url = new URL(request.url)
      const trigger_type = url.searchParams.get(
        'filter_by_alert_trigger_types'
      ) as AlertTriggerType

      const secrets = Array.from({ length: 10 }).map(() =>
        mockConversation({
          alertsConfig: { numAlerts: 10, type: 'secret' },
        })
      )
      const malicious = Array.from({ length: 10 }).map(() =>
        mockConversation({
          alertsConfig: { numAlerts: 10, type: 'malicious' },
        })
      )
      const pii = Array.from({ length: 10 }).map(() =>
        mockConversation({
          alertsConfig: { numAlerts: 10, type: 'pii' },
        })
      )

      const results = []

      if (trigger_type === AlertTriggerType.CODEGATE_SECRETS) {
        results.push(...secrets)
      }
      if (trigger_type === AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER) {
        results.push(...malicious)
      }
      if (trigger_type === AlertTriggerType.CODEGATE_PII) {
        results.push(...pii)
      }

      const responsePayload: PaginatedMessagesResponse = {
        data: results,
        limit: 50,
        offset: 0,
        total: 30,
      }

      return HttpResponse.json(responsePayload)
    }
  ),
  http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/alerts'), () => {
    return HttpResponse.json(mockedAlerts)
  }),
  http.get(
    mswEndpoint('/api/v1/workspaces/:workspace_name/alerts-summary'),
    () => {
      const response: AlertSummary = {
        malicious_packages: 13,
        pii: 9,
        secrets: 10,
      }
      return HttpResponse.json(response)
    }
  ),
  http.get(mswEndpoint('/api/v1/workspaces'), () => {
    return HttpResponse.json(mockedWorkspaces)
  }),
  http.get(mswEndpoint('/api/v1/workspaces/archive'), () => {
    return HttpResponse.json({
      workspaces: [
        {
          name: 'archived_workspace',
          is_active: false,
        },
      ],
    })
  }),
  http.post(mswEndpoint('/api/v1/workspaces'), () => {
    return HttpResponse.json(mockedWorkspaces)
  }),
  http.post(
    mswEndpoint('/api/v1/workspaces/active'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.post(
    mswEndpoint('/api/v1/workspaces/archive/:workspace_name/recover'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.delete(
    mswEndpoint('/api/v1/workspaces/:workspace_name'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.delete(
    mswEndpoint('/api/v1/workspaces/archive/:workspace_name'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.get(
    mswEndpoint('/api/v1/workspaces/:workspace_name/custom-instructions'),
    () => {
      return HttpResponse.json({ prompt: 'foo' })
    }
  ),
  http.get(
    mswEndpoint('/api/v1/workspaces/:workspace_name/token-usage'),
    () => {
      return HttpResponse.json({
        tokens_by_model: {
          'claude-3-5-sonnet-latest': {
            provider_type: ProviderType.ANTHROPIC,
            model: 'claude-3-5-sonnet-latest',
            token_usage: {
              input_tokens: 1183,
              output_tokens: 433,
              input_cost: 0.003549,
              output_cost: 0.006495,
            },
          },
        },
        token_usage: {
          input_tokens: 1183,
          output_tokens: 433,
          input_cost: 0.003549,
          output_cost: 0.006495,
        },
      })
    }
  ),
  http.put(
    mswEndpoint('/api/v1/workspaces/:workspace_name/custom-instructions'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.get(mswEndpoint('/api/v1/workspaces/:workspace_name/muxes'), () =>
    HttpResponse.json([])
  ),
  http.put(
    mswEndpoint('/api/v1/workspaces/:workspace_name/muxes'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.get(mswEndpoint('/api/v1/provider-endpoints/:provider_id/models'), () =>
    HttpResponse.json(mockedProvidersModels)
  ),
  http.get(mswEndpoint('/api/v1/provider-endpoints/models'), () =>
    HttpResponse.json(mockedProvidersModels)
  ),
  http.get(mswEndpoint('/api/v1/provider-endpoints/:provider_id'), () =>
    HttpResponse.json(mockedProviders[0])
  ),
  http.get(mswEndpoint('/api/v1/provider-endpoints'), () =>
    HttpResponse.json(mockedProviders)
  ),
  http.post(
    mswEndpoint('/api/v1/provider-endpoints'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.put(
    mswEndpoint('/api/v1/provider-endpoints'),
    () => new HttpResponse(null, { status: 204 })
  ),
  http.delete(
    mswEndpoint('/api/v1/provider-endpoints'),
    () => new HttpResponse(null, { status: 204 })
  ),
]
