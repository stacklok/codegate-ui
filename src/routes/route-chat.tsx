import { useParams } from 'react-router-dom'
import { parsingPromptText, sanitizeQuestionPrompt } from '@/lib/utils'
import { Breadcrumb, Breadcrumbs, Loader } from '@stacklok/ui-kit'
import { BreadcrumbHome } from '@/components/BreadcrumbHome'
import { PageContainer } from '@/components/page-container'
import { PageHeading } from '@/components/heading'
import {
  ConversationView,
  useConversationSearchParams,
} from '@/features/dashboard-messages/hooks/use-conversation-search-params'
import { TabsConversation } from '@/features/dashboard-messages/components/tabs-conversation'
import { SectionConversationTranscript } from '@/features/dashboard-messages/components/section-conversation-transcript'
import { SectionConversationSecrets } from '@/features/dashboard-messages/components/section-conversation-secrets'
import { ErrorFallbackContent } from '@/components/Error'
import { getConversationTitle } from '@/features/dashboard-messages/lib/get-conversation-title'
import { formatTime } from '@/lib/format-time'
import { Conversation } from '@/api/generated'
import { useQueryGetWorkspaceMessageById } from '@/features/dashboard-messages/hooks/use-query-get-workspace-message-by-id'

function ConversationContent({
  view,
  conversation,
}: {
  view: ConversationView
  conversation: Conversation
}) {
  switch (view) {
    case ConversationView.OVERVIEW:
      return <SectionConversationTranscript conversation={conversation} />
    case ConversationView.SECRETS:
      return <SectionConversationSecrets conversation={conversation} />
  }
}

function TitleContent({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex items-baseline gap-2">
      <span>{getConversationTitle(conversation)}</span>
      <span className="block text-xl font-semibold text-secondary">
        {formatTime(new Date(conversation.conversation_timestamp))}
      </span>
    </div>
  )
}

export function RouteChat() {
  const { id } = useParams<'id'>()
  const { state } = useConversationSearchParams()

  const { data: conversation, isLoading } = useQueryGetWorkspaceMessageById({
    id: id ?? '',
  })

  const title =
    conversation === undefined ||
    conversation.question_answers?.[0]?.question?.message === undefined
      ? `Prompt ${id}`
      : parsingPromptText(
          sanitizeQuestionPrompt({
            question: conversation.question_answers?.[0].question.message,
            answer: conversation.question_answers?.[0]?.answer?.message ?? '',
          }),
          conversation.conversation_timestamp
        )

  if (isLoading)
    return (
      <div className="py-60">
        <Loader className="mx-auto size-10" />
      </div>
    )
  if (!id || !conversation) return <ErrorFallbackContent />

  return (
    <PageContainer>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb className="block w-96 truncate">{title}</Breadcrumb>
      </Breadcrumbs>
      <PageHeading
        level={1}
        title={<TitleContent conversation={conversation} />}
      />

      <TabsConversation id={id}>
        <ConversationContent conversation={conversation} view={state.view} />
      </TabsConversation>
    </PageContainer>
  )
}
