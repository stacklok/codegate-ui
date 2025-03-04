import { isAlertSecret } from '../../../lib/is-alert-secret'
import {
  Tab as BaseTab,
  Tabs,
  TabList,
  TabPanel,
  Badge,
} from '@stacklok/ui-kit'

import {
  ConversationView,
  useConversationSearchParams,
} from '../hooks/use-conversation-search-params'
import { useConversationById } from '../hooks/use-conversation-by-id'

function Tab({
  id,
  title,
  count,
}: {
  title: string
  id: ConversationView
  count?: number
}) {
  return (
    <BaseTab className="flex items-center gap-1" id={id}>
      <span className="block">{title}</span>
      {count ? (
        <Badge
          data-testid={`tab-${id}-count`}
          size="sm"
          className="max-h-5 text-[11px]"
        >
          {count}
        </Badge>
      ) : null}
    </BaseTab>
  )
}

export function TabsConversation({
  children,
  id,
}: {
  id: string
  children: React.ReactNode
}) {
  const { state, setView } = useConversationSearchParams()

  const { data } = useConversationById(id)

  const secretsCount = data?.alerts?.filter(isAlertSecret).length ?? 0

  return (
    <Tabs
      onSelectionChange={(key) => setView(key.toString() as ConversationView)}
      selectedKey={state.view}
      defaultSelectedKey={ConversationView.OVERVIEW}
    >
      <TabList>
        <Tab title="Overview" id={ConversationView.OVERVIEW} />
        <Tab
          title="Secrets"
          count={secretsCount}
          id={ConversationView.SECRETS}
        />
      </TabList>

      <TabPanel id={state.view}>{children}</TabPanel>
    </Tabs>
  )
}
