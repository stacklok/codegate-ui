import {
  AlertSummary,
  ConversationSummary,
  QuestionType,
} from '@/api/generated'
import { faker } from '@faker-js/faker'
import { TOKEN_USAGE_AGG } from './token-usage.mock'

export function mockConversationSummary(
  {
    type = QuestionType.CHAT,
    withTokenUsage = true,
    alertsSummary,
  }: {
    type?: QuestionType
    withTokenUsage?: boolean
    alertsSummary: AlertSummary
  } = {
    alertsSummary: {
      malicious_packages: 0,
      pii: 0,
      secrets: 0,
      total_alerts: 0,
    },
  }
): ConversationSummary {
  const timestamp = faker.date.recent().toISOString()

  return {
    provider: 'vllm',
    alerts_summary: alertsSummary,
    prompt: {
      message: faker.lorem.words(5),
      message_id: faker.string.uuid(),
      timestamp,
    },
    token_usage_agg: withTokenUsage ? TOKEN_USAGE_AGG : null,
    type,
    chat_id: faker.string.uuid(), // NOTE: This isn't a UUID in the API
    conversation_timestamp: timestamp,
  }
}
