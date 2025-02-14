import { isConversationWithMaliciousAlerts } from '../../../lib/is-alert-malicious'
import { multiFilter } from '@/lib/multi-filter'
import { isConversationWithSecretAlerts } from '../../../lib/is-alert-secret'
import { V1GetWorkspaceMessagesResponse } from '@/api/generated'
import {
  Tab as BaseTab,
  Tabs,
  TabList,
  TabPanel,
  Badge,
  Card,
  CardBody,
} from '@stacklok/ui-kit'
import {
  AlertsFilterView,
  useMessagesFilterSearchParams,
} from '../hooks/use-messages-filter-search-params'
import { SearchFieldMessages } from './search-field-messages'
import { tv } from 'tailwind-variants'
import { useQueryGetWorkspaceMessages } from '@/hooks/use-query-get-workspace-messages'

type AlertsCount = {
  all: number
  malicious: number
  secrets: number
}

function select(data: V1GetWorkspaceMessagesResponse): AlertsCount {
  const all: number = data?.length ?? 0

  const malicious: number = multiFilter(data, [
    isConversationWithMaliciousAlerts,
  ]).length

  const secrets: number = multiFilter(data, [
    isConversationWithSecretAlerts,
  ]).length

  return {
    all,
    malicious,
    secrets,
  }
}

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
  id: AlertsFilterView
  count: number
}) {
  return (
    <BaseTab className={tabStyle()} id={id}>
      <span className="block">{title}</span>
      <Badge
        data-testid={`tab-${id}-count`}
        size="sm"
        className="max-h-5 text-[11px]"
      >
        {count}
      </Badge>
    </BaseTab>
  )
}

export function TabsMessages({ children }: { children: React.ReactNode }) {
  const { state, setView } = useMessagesFilterSearchParams()

  const { data } = useQueryGetWorkspaceMessages({
    select,
  })

  return (
    <Tabs
      onSelectionChange={(key) => setView(key.toString() as AlertsFilterView)}
      selectedKey={state.view}
      defaultSelectedKey={AlertsFilterView.ALL}
    >
      <div className="mb-4 flex items-center gap-2">
        <TabList className="overflow-hidden rounded-sm bg-gray-100">
          <Tab title="All" count={data?.all ?? 0} id={AlertsFilterView.ALL} />
          <Tab
            title="Malicious"
            count={data?.malicious ?? 0}
            id={AlertsFilterView.MALICIOUS}
          />
          <Tab
            title="Secrets"
            count={data?.secrets ?? 0}
            id={AlertsFilterView.SECRETS}
          />
        </TabList>

        <SearchFieldMessages className="ml-auto" />
      </div>
      <TabPanel id={state.view}>
        <Card>
          <CardBody className="p-0">{children}</CardBody>
        </Card>
      </TabPanel>
    </Tabs>
  )
}
