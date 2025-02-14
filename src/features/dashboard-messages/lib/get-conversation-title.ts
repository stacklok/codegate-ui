import { Conversation, QuestionType } from '@/api/generated'
import { getProviderString } from './get-provider-string'

function getTypeString(type: Conversation['type']) {
  switch (type) {
    case QuestionType.CHAT:
      return 'Chat'
    case QuestionType.FIM:
      return 'Fill in the middle (FIM)'
    default:
      return type
  }
}

export function getConversationTitle(conversation: Conversation) {
  return `${getTypeString(conversation.type)} with ${getProviderString(conversation.provider)}`
}
