import { useParams } from "react-router-dom";
import { usePromptsData } from "@/hooks/usePromptsData";
import { extractTitleFromMessage, sanitizeQuestionPrompt } from "@/lib/utils";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { Markdown } from "@/components/Markdown";
import { Breadcrumb, Breadcrumbs } from "@stacklok/ui-kit";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";

export function RouteChat() {
  const { id } = useParams();
  const { data: prompts } = usePromptsData();
  const chat = prompts?.find((prompt) => prompt.chat_id === id);

  const title =
    chat === undefined
      ? ""
      : extractTitleFromMessage(
          chat.question_answers?.[0]?.question?.message
            ? sanitizeQuestionPrompt({
                question: chat.question_answers?.[0].question.message,
                answer: chat.question_answers?.[0]?.answer?.message ?? "",
              })
            : `Prompt ${chat.conversation_timestamp}`,
        );

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>{title}</Breadcrumb>
      </Breadcrumbs>

      <div className="w-[calc(100vw-18rem)]">
        <ChatMessageList>
          {(chat?.question_answers ?? []).map(({ question, answer }, index) => (
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
          ))}
        </ChatMessageList>
      </div>
    </>
  );
}
