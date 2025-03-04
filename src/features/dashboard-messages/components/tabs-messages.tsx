import {
  Tab as BaseTab,
  Tabs,
  TabList,
  TabPanel,
  Badge,
  Card,
  CardBody,
} from '@stacklok/ui-kit'
import { useMessagesFilterSearchParams } from '../hooks/use-messages-filter-search-params'
import { SearchFieldMessages } from './search-field-messages'
import { tv } from 'tailwind-variants'
import { useQueryGetWorkspaceAlertsSummary } from '@/hooks/use-query-get-workspace-alerts-summary'
import { useQueryGetWorkspaceMessages } from '@/hooks/use-query-get-workspace-messages'
import { AlertTriggerType } from '@/api/generated'

const tabStyle = tv({
  base: [
    'mx-0.5 my-1 first:ml-1 last:mr-1',
    `flex h-[calc(2rem-2px)] items-center gap-1 rounded !border-0 bg-transparent
    text-secondary`,
    'hover:bg-gray-50 hover:text-secondary',
    `selected:border-gray-200 selected:bg-base selected:text-secondary
    selected:shadow-sm hover:selected:bg-base`,
  ],
})

function Tab({
  id,
  title,
  count,
}: {
  title: string
  id: 'all' | AlertTriggerType
  count?: number
}) {
  return (
    <BaseTab className={tabStyle()} id={id}>
      <span className="block">{title}</span>
      {typeof count === 'number' ? (
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

export function TabsMessages({ children }: { children: React.ReactNode }) {
  const { state, setView } = useMessagesFilterSearchParams()
  const { data: messages } = useQueryGetWorkspaceMessages({ query: {} })
  const { data: alertsSummary } = useQueryGetWorkspaceAlertsSummary()
  console.debug('👉 state:', state)

  return (
    <Tabs
      onSelectionChange={(key) =>
        setView(
          key.toString() === 'all'
            ? undefined
            : (key.toString() as AlertTriggerType)
        )
      }
      selectedKey={state.view || 'all'}
      defaultSelectedKey="all"
    >
      <div className="mb-4 flex items-center gap-2">
        <TabList className="overflow-hidden rounded-sm bg-gray-100">
          <Tab title="All" count={messages?.total ?? 0} id="all" />
          <Tab
            title="Malicious"
            count={alertsSummary?.malicious_packages ?? 0}
            id={AlertTriggerType.CODEGATE_CONTEXT_RETRIEVER}
          />
          <Tab
            title="Secrets"
            count={alertsSummary?.secrets ?? 0}
            id={AlertTriggerType.CODEGATE_SECRETS}
          />
          <Tab
            title="PII"
            count={alertsSummary?.pii ?? 0}
            id={AlertTriggerType.CODEGATE_PII}
          />
        </TabList>

        <SearchFieldMessages className="ml-auto" />
      </div>
      <TabPanel id={state.view ?? 'all'}>
        <Card>
          <CardBody className="p-0">{children}</CardBody>
        </Card>
      </TabPanel>
    </Tabs>
  )
}
