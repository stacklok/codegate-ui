import { Conversation, QuestionType } from '@/api/generated'
import { faker } from '@faker-js/faker'
import { TOKEN_USAGE_AGG } from './token-usage.mock'
import { mockAlert } from './alert.mock'

export function mockConversation({
  type = QuestionType.CHAT,
  withTokenUsage = true,
  alertsConfig = {},
}: {
  type?: QuestionType
  withTokenUsage?: boolean
  alertsConfig?: {
    numAlerts?: number
    type?: 'secret' | 'malicious' | 'any' | 'pii'
  }
} = {}) {
  const timestamp = faker.date.recent().toISOString()

  return {
    question_answers: [
      {
        question: {
          message: faker.lorem.sentence(),
          timestamp: timestamp,
          message_id: faker.string.uuid(),
        },
        answer: {
          message: faker.lorem.sentence(),
          timestamp: timestamp,
          message_id: faker.string.uuid(),
        },
      },
    ],
    provider: 'vllm',
    alerts: Array.from({
      length:
        typeof alertsConfig?.numAlerts === 'number'
          ? alertsConfig?.numAlerts
          : faker.number.int({ min: 2, max: 5 }),
    }).map(() =>
      mockAlert({
        type:
          alertsConfig?.type == null || alertsConfig.type === 'any'
            ? faker.helpers.arrayElement(['secret', 'malicious', 'pii'])
            : alertsConfig.type,
      })
    ),
    token_usage_agg: withTokenUsage ? TOKEN_USAGE_AGG : null,
    type,
    chat_id: faker.string.uuid(), // NOTE: This isn't a UUID in the API
    conversation_timestamp: timestamp,
  } as const satisfies Conversation
}
