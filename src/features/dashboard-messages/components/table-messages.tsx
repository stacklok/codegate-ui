import { formatDistanceToNow } from "date-fns";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  Button,
  ResizableTableContainer,
  Tooltip,
  TooltipTrigger,
} from "@stacklok/ui-kit";
import { Alert, Conversation, QuestionType } from "@/api/generated";

import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { TableAlertTokenUsage } from "./table-alert-token-usage";

import { useMessagesFilterSearchParams } from "../hooks/use-messages-filter-search-params";
import { Key01, PackageX } from "@untitled-ui/icons-react";
import { TableAlertsEmptyState } from "./table-messages-empty-state";
import { hrefs } from "@/lib/hrefs";
import { isAlertMalicious } from "../lib/is-alert-malicious";
import { isAlertSecret } from "../lib/is-alert-secret";
import { twMerge } from "tailwind-merge";
import { useQueryGetWorkspaceMessagesTable } from "../hooks/use-query-get-workspace-messages-table";
import {
  TABLE_MESSAGES_COLUMNS,
  TableMessagesColumn,
} from "../constants/table-messages-columns";

const getPromptText = (conversation: Conversation) => {
  return (conversation.question_answers[0]?.question?.message ?? "N/A")
    .trim()
    .slice(0, 200); // arbitrary slice to prevent long prompts
};

function getTypeText(type: QuestionType) {
  switch (type) {
    case QuestionType.CHAT:
      return "Chat";
    case QuestionType.FIM:
      return "Code Suggestion";
    default:
      return "Unknown";
  }
}

function countAlerts(alerts: Alert[]): {
  secrets: number;
  malicious: number;
} {
  return {
    secrets: alerts.filter(isAlertSecret).length,
    malicious: alerts.filter(isAlertMalicious).length,
  };
}

function AlertsSummaryCount({
  count,
  icon: Icon,
  strings,
}: {
  count: number;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  strings: {
    singular: string;
    plural: string;
  };
}) {
  const tooltipText = `${count} ${count === 1 ? strings.singular : strings.plural} detected`;

  return (
    <TooltipTrigger delay={0}>
      <Button
        aria-label={`${strings?.plural} count`}
        variant="tertiary"
        isIcon
        className={twMerge(
          "flex gap-1 items-center",
          count > 0 ? "text-secondary" : "text-disabled"
        )}
      >
        <Icon className="size-4" />
        {count}
      </Button>
      <Tooltip>{tooltipText}</Tooltip>
    </TooltipTrigger>
  );
}

function AlertsSummaryCellContent({ alerts }: { alerts: Alert[] }) {
  const { malicious, secrets } = countAlerts(alerts);

  return (
    <div className="flex gap-2 items-center">
      <AlertsSummaryCount
        strings={{
          singular: "malicious package",
          plural: "malicious packages",
        }}
        count={malicious}
        icon={PackageX}
      />
      <AlertsSummaryCount
        strings={{
          singular: "secret",
          plural: "secrets",
        }}
        count={secrets}
        icon={Key01}
      />
    </div>
  );
}

function CellRenderer({
  column,
  row,
}: {
  column: TableMessagesColumn;
  row: Conversation;
}) {
  switch (column.id) {
    case "time":
      return (
        <span className="whitespace-nowrap">
          {formatDistanceToNow(new Date(row.conversation_timestamp), {
            addSuffix: true,
          })}
        </span>
      );
    case "type":
      return getTypeText(row.type);
    case "prompt":
      return getPromptText(row);
    case "alerts":
      return <AlertsSummaryCellContent alerts={row.alerts ?? []} />;
    case "token_usage":
      return <TableAlertTokenUsage usage={row.token_usage_agg} />;

    default:
      return column.id satisfies never;
  }
}

export function TableMessages() {
  const { state, prevPage, nextPage } = useMessagesFilterSearchParams();

  const { data = [] } = useQueryGetWorkspaceMessagesTable();
  const { dataView, hasNextPage, hasPreviousPage } = useClientSidePagination(
    data,
    state.page,
    15
  );

  return (
    <>
      <ResizableTableContainer>
        <Table data-testid="messages-table" aria-label="Alerts table">
          <TableHeader columns={TABLE_MESSAGES_COLUMNS}>
            {(column) => <Column {...column} id={column.id} />}
          </TableHeader>
          <TableBody
            renderEmptyState={() => <TableAlertsEmptyState />}
            items={dataView}
          >
            {(row) => (
              <Row
                columns={TABLE_MESSAGES_COLUMNS}
                id={row.chat_id}
                href={hrefs.prompt(row.chat_id)}
                data-timestamp={row.conversation_timestamp}
              >
                {(column) => (
                  <Cell
                    className="h-5 py-1 group-last/row:border-b-0 truncate"
                    alignment={column.alignment}
                    id={column.id}
                  >
                    <CellRenderer column={column} row={row} />
                  </Cell>
                )}
              </Row>
            )}
          </TableBody>
        </Table>
      </ResizableTableContainer>

      {hasNextPage || hasPreviousPage ? (
        <div className="flex justify-center w-full p-4">
          <div className="grid grid-cols-2 gap-2">
            <Button isDisabled={!hasPreviousPage} onPress={prevPage}>
              Previous
            </Button>
            <Button isDisabled={!hasNextPage} onPress={nextPage}>
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
