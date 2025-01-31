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
} from "@stacklok/ui-kit";
import { AlertConversation, QuestionType } from "@/api/generated";
import {
  sanitizeQuestionPrompt,
  parsingPromptText,
  getIssueDetectedType,
} from "@/lib/utils";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { TableAlertTokenUsage } from "./table-alert-token-usage";

import { useQueryGetWorkspaceAlertTable } from "../hooks/use-query-get-workspace-alerts-table";
import { useAlertsFilterSearchParams } from "../hooks/use-alerts-filter-search-params";
import { Key01, PackageX } from "@untitled-ui/icons-react";
import { TableAlertsEmptyState } from "./table-alerts-empty-state";
import { ComponentProps } from "react";
import { hrefs } from "@/lib/hrefs";

const getTitle = (alert: AlertConversation) => {
  const prompt = alert.conversation;
  const title = parsingPromptText(
    sanitizeQuestionPrompt({
      question: prompt.question_answers?.[0]?.question.message ?? "",
      answer: prompt.question_answers?.[0]?.answer?.message ?? "",
    }),
    prompt.conversation_timestamp,
  );

  return title;
};

function TypeCellContent({ alert }: { alert: AlertConversation }) {
  const conversationType = alert.conversation.type;

  switch (conversationType) {
    case QuestionType.CHAT:
      return "Chat";
    case QuestionType.FIM:
      return "Code Suggestion";
    default:
      return "Unknown";
  }
}

function IssueDetectedCellContent({ alert }: { alert: AlertConversation }) {
  const issueDetected = getIssueDetectedType(alert);

  switch (issueDetected) {
    case "leaked_secret":
      return (
        <>
          <Key01 className="size-4 text-blue-700" />
          Blocked secret exposure
        </>
      );
    case "malicious_package":
      return (
        <>
          <PackageX className="size-4 text-blue-700" />
          Blocked malicious package
        </>
      );
    default:
      return "";
  }
}

type ColumnId = "time" | "type" | "event" | "issue_detected" | "token_usage";

type Column = { id: ColumnId } & Omit<ComponentProps<typeof Column>, "id">;

const COLUMNS: Column[] = [
  {
    id: "time",
    isRowHeader: true,
    children: "Time",
    width: 200,
  },
  {
    id: "type",
    children: "Type",
    width: 150,
  },
  {
    id: "event",
    children: "Event",
  },
  {
    id: "issue_detected",
    children: "Issue detected",
    width: 325,
  },
  {
    id: "token_usage",
    children: "Token usage",
    width: 200,
  },
];

function CellRenderer({
  column,
  row,
}: {
  column: Column;
  row: AlertConversation;
}) {
  switch (column.id) {
    case "time":
      return (
        <span className="whitespace-nowrap">
          {formatDistanceToNow(new Date(row.timestamp), {
            addSuffix: true,
          })}
        </span>
      );
    case "type":
      return <TypeCellContent alert={row} />;
    case "event":
      return getTitle(row);
    case "issue_detected":
      return (
        <div className="truncate flex gap-2  items-center">
          <IssueDetectedCellContent alert={row} />
        </div>
      );
    case "token_usage":
      return <TableAlertTokenUsage usage={row.conversation.token_usage_agg} />;

    default:
      return column.id satisfies never;
  }
}

export function TableAlerts() {
  const { state, prevPage, nextPage } = useAlertsFilterSearchParams();

  const { data = [] } = useQueryGetWorkspaceAlertTable();

  const { dataView, hasNextPage, hasPreviousPage } = useClientSidePagination(
    data,
    state.page,
    15,
  );

  return (
    <>
      <ResizableTableContainer>
        <Table data-testid="alerts-table" aria-label="Alerts table">
          <TableHeader columns={COLUMNS}>
            {(column) => <Column {...column} id={column.id} />}
          </TableHeader>
          <TableBody
            renderEmptyState={() => <TableAlertsEmptyState />}
            items={dataView}
          >
            {(row) => (
              <Row
                columns={COLUMNS}
                id={row.alert_id}
                href={hrefs.prompt(row.conversation.chat_id)}
              >
                {(column) => (
                  <Cell
                    className="h-6 group-last/row:border-b-0"
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
