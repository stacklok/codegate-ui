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
import { Breadcrumb, Breadcrumbs, Heading } from "@stacklok/ui-kit";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { ConversationSummary } from "@/features/dashboard-messages/components/conversation-summary";
import { PageContainer } from "@/components/page-container";
import { PageHeading } from "@/components/heading";
import { isAlertSecret } from "@/lib/is-alert-secret";
import { ConversationSecretsDetected } from "@/features/dashboard-messages/components/conversation-secrets-detected";

export function RouteChat() {
  const { id } = useParams();
  const { data: conversation } = useQueryGetWorkspaceMessages({
    select: (data) => data.find((m) => m.chat_id === id),
  });
  console.debug("👉  conversation:", conversation);

  const secrets = conversation?.alerts?.filter(isAlertSecret);

  const title =
    conversation === undefined ||
    conversation.question_answers?.[0]?.question?.message === undefined
      ? `Prompt ${id}`
      : parsingPromptText(
          sanitizeQuestionPrompt({
            question: conversation.question_answers?.[0].question.message,
            answer: conversation.question_answers?.[0]?.answer?.message ?? "",
          }),
          conversation.conversation_timestamp,
        );

  return (
    <PageContainer>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb className="w-96 block truncate">{title}</Breadcrumb>
      </Breadcrumbs>
      <PageHeading level={1} title="Conversation" />
      <section className="py-4 border-b-gray-200 border-b ">
        <Heading
          level={2}
          className="text-secondary text-xl font-semibold mb-4"
        >
          Conversation summary
        </Heading>

        {conversation ? (
          <ConversationSummary conversation={conversation} />
        ) : null}
      </section>

      {/*
       * NOTE: The secrets detection backend code appears to be returning fairly
       * unstructured data with a lot of false positives. This is not actually
       * referenced in the frontend yet.
       */}
      {secrets && secrets.length > 0 ? (
        <section className="py-4 border-b-gray-200 border-b ">
          <Heading
            level={3}
            className="text-secondary text-xl font-semibold mb-4"
          >
            Secrets protected ({secrets.length})
          </Heading>

          <p className="mb-2">
            The following secrets were detected in plain-text in the input
            provided to the LLM.
          </p>

          <ConversationSecretsDetected alerts={secrets} />
        </section>
      ) : null}

      {/* {alertDetail && (
          <Card className="w-full mb-2">
            <CardBody className="w-full h-fit overflow-auto max-h-[500px]">
              <AlertDetail alert={alertDetail} />
            </CardBody>
          </Card>
        )} */}

      <section className="py-4 border-b-gray-200 border-b ">
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
    </PageContainer>
  );
}
