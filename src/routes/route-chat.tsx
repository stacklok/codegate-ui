import { useParams } from "react-router-dom";
import { useQueryGetWorkspaceMessages } from "@/hooks/use-query-get-workspace-messages";
import { parsingPromptText, sanitizeQuestionPrompt } from "@/lib/utils";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { Markdown } from "@/components/Markdown";
import { Breadcrumb, Breadcrumbs, Card, CardBody } from "@stacklok/ui-kit";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { useQueryGetWorkspaceAlertTable } from "@/features/alerts/hooks/use-query-get-workspace-alerts-table";
import { AlertDetail } from "@/components/AlertDetail";

export function RouteChat() {
  const { id } = useParams();
  const { data = [] } = useQueryGetWorkspaceAlertTable();
  const { data: prompts } = useQueryGetWorkspaceMessages();
  const chat = prompts?.find((prompt) => prompt.chat_id === id);

  const title =
    chat === undefined ||
    chat.question_answers?.[0]?.question?.message === undefined
      ? `Prompt ${id}`
      : parsingPromptText(
          sanitizeQuestionPrompt({
            question: chat.question_answers?.[0].question.message,
            answer: chat.question_answers?.[0]?.answer?.message ?? "",
          }),
          chat.conversation_timestamp,
        );

  // we have an issue on BE, we received duplicated alerts
  const alertDetail = data.filter((alert) =>
    alert.conversation.question_answers.some(
      (item) => item.question.message_id === id,
    ),
  )[0];

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb className="w-96 block truncate">{title}</Breadcrumb>
      </Breadcrumbs>

      <div className="w-[calc(100vw-18rem)]">
        {alertDetail && (
          <Card className="w-full mb-2">
            <CardBody className="w-full h-fit overflow-auto max-h-[500px]">
              <AlertDetail alert={alertDetail} />
            </CardBody>
          </Card>
        )}

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
