import { Markdown } from "@/components/Markdown";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { sanitizeQuestionPrompt } from "@/lib/utils";
import { Heading } from "@stacklok/ui-kit";
import { ConversationSummary } from "./conversation-summary";
import { Conversation } from "@/api/generated";

export function SectionConversationTranscript({
  conversation,
}: {
  conversation: Conversation;
}) {
  return (
    <>
      <section
        className="py-4 border-b-gray-200 border-b"
        aria-label="Conversation summary"
      >
        <Heading
          level={2}
          className="text-secondary text-xl font-semibold mb-4"
        >
          Conversation summary
        </Heading>

        <ConversationSummary conversation={conversation} />
      </section>
      <section
        className="py-4 border-b-gray-200 border-b"
        aria-label="Conversation transcript"
      >
        <Heading
          level={3}
          className="text-secondary text-xl font-semibold mb-4"
        >
          Conversation transcript
        </Heading>

        <ChatMessageList>
          {(conversation?.question_answers ?? []).map(
            ({ question, answer }, index) => (
              <div key={index} className="flex flex-col size-full gap-6">
                <ChatBubble variant="sent">
                  <ChatBubbleAvatar data-testid="avatar-user" fallback="User" />
                  <ChatBubbleMessage variant="sent">
                    <Markdown>
                      {sanitizeQuestionPrompt({
                        question: question?.message ?? "",
                        answer: answer?.message ?? "",
                      })}
                    </Markdown>
                  </ChatBubbleMessage>
                </ChatBubble>
                <ChatBubble variant="received">
                  <ChatBubbleAvatar data-testid="avatar-ai" fallback="AI" />
                  <ChatBubbleMessage variant="received">
                    <Markdown>{answer?.message ?? ""}</Markdown>
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            ),
          )}
        </ChatMessageList>
      </section>
    </>
  );
}
