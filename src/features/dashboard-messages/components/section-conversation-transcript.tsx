import { Markdown } from '@/components/Markdown'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import { sanitizeQuestionPrompt } from '@/lib/utils'
import { Heading } from '@stacklok/ui-kit'
import { ConversationSummary } from './conversation-summary'
import { Conversation } from '@/api/generated'

export function SectionConversationTranscript({
  conversation,
}: {
  conversation: Conversation
}) {
  return (
    <>
      <section
        className="border-b border-b-gray-200 py-4"
        aria-label="Conversation summary"
      >
        <Heading level={2} className="mb-4 text-xl font-semibold text-primary">
          Conversation summary
        </Heading>

        <ConversationSummary conversation={conversation} />
      </section>
      <section
        className="border-b border-b-gray-200 py-4"
        aria-label="Conversation transcript"
      >
        <Heading level={3} className="mb-4 text-xl font-semibold text-primary">
          Conversation transcript
        </Heading>

        <ChatMessageList>
          {(conversation?.question_answers ?? []).map(
            ({ question, answer }, index) => (
              <div key={index} className="flex size-full flex-col gap-6">
                <ChatBubble variant="sent">
                  <ChatBubbleAvatar data-testid="avatar-user" fallback="User" />
                  <ChatBubbleMessage variant="sent">
                    <Markdown>
                      {sanitizeQuestionPrompt({
                        question: question?.message ?? '',
                        answer: answer?.message ?? '',
                      })}
                    </Markdown>
                  </ChatBubbleMessage>
                </ChatBubble>
                <ChatBubble variant="received">
                  <ChatBubbleAvatar data-testid="avatar-ai" fallback="AI" />
                  <ChatBubbleMessage variant="received">
                    <Markdown>{answer?.message ?? ''}</Markdown>
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            )
          )}
        </ChatMessageList>
      </section>
    </>
  )
}
