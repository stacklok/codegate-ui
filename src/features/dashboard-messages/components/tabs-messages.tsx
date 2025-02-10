import { isConversationWithMaliciousAlerts } from "../../../lib/is-alert-malicious";
import { multiFilter } from "@/lib/multi-filter";
import { isConversationWithSecretAlerts } from "../../../lib/is-alert-secret";
import { V1GetWorkspaceMessagesResponse } from "@/api/generated";
import {
  Tab as BaseTab,
  Tabs,
  TabList,
  TabPanel,
  Badge,
  Card,
  CardBody,
} from "@stacklok/ui-kit";
import {
  AlertsFilterView,
  useMessagesFilterSearchParams,
} from "../hooks/use-messages-filter-search-params";
import { SearchFieldMessages } from "./search-field-messages";
import { tv } from "tailwind-variants";
import { useQueryGetWorkspaceMessages } from "@/hooks/use-query-get-workspace-messages";

type AlertsCount = {
  all: number;
  malicious: number;
  secrets: number;
};

function select(data: V1GetWorkspaceMessagesResponse): AlertsCount {
  const all: number = data?.length ?? 0;

  const malicious: number = multiFilter(data, [
    isConversationWithMaliciousAlerts,
  ]).length;

  const secrets: number = multiFilter(data, [
    isConversationWithSecretAlerts,
  ]).length;

  return {
    all,
    malicious,
    secrets,
  };
}

const tabStyle = tv({
  base: [
    "my-1 mx-0.5 first:ml-1 last:mr-1",
    "rounded bg-transparent h-[calc(2rem-2px)] flex text-secondary items-center gap-1 !border-0",
    "hover:bg-gray-50 hover:text-secondary",
    "selected:bg-base hover:selected:bg-base selected:shadow-sm selected:border-gray-200 selected:text-secondary",
  ],
});

function Tab({
  id,
  title,
  count,
}: {
  title: string;
  id: AlertsFilterView;
  count: number;
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
  );
}

export function TabsMessages({ children }: { children: React.ReactNode }) {
  const { state, setView } = useMessagesFilterSearchParams();

  const { data } = useQueryGetWorkspaceMessages({
    select,
  });

  return (
    <Tabs
      onSelectionChange={(key) => setView(key.toString() as AlertsFilterView)}
      selectedKey={state.view}
      defaultSelectedKey={AlertsFilterView.ALL}
    >
      <div className="flex gap-2 items-center mb-4">
        <TabList className="bg-gray-100 rounded-sm overflow-hidden">
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
  );
}
