import { formatDistanceToNow } from "date-fns";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  Badge,
  Button,
  ResizableTableContainer,
} from "@stacklok/ui-kit";
import { AlertConversation, QuestionType } from "@/api/generated";
import {
  sanitizeQuestionPrompt,
  parsingPromptText,
  getIssueDetectedType,
} from "@/lib/utils";
import { useAlertSearch } from "@/hooks/useAlertSearch";
import { useNavigate } from "react-router-dom";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";
import { TableAlertTokenUsage } from "./table-alert-token-usage";
import { Key01, PackageX } from "@untitled-ui/icons-react";
import { SearchFieldAlerts } from "./search-field-alerts";
import { useQueryGetWorkspaceAlertTable } from "../hooks/use-query-get-workspace-alerts-table";
import { SwitchMaliciousAlertsFilter } from "./switch-malicious-alerts-filter";

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

export function TableAlerts() {
  const { page, nextPage, prevPage } = useAlertSearch();
  const navigate = useNavigate();
  const { data: filteredAlerts = [] } = useQueryGetWorkspaceAlertTable();

  const { dataView, hasNextPage, hasPreviousPage } = useClientSidePagination(
    filteredAlerts,
    page,
    15,
  );

  return (
    <>
      <div className="flex mb-2 mx-2 justify-between w-[calc(100vw-20rem)]">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-lg">All Alerts</h2>
          <Badge size="sm" variant="inverted" data-testid="alerts-count">
            {filteredAlerts.length}
          </Badge>
        </div>

        <div className="flex items-center gap-8">
          <SwitchMaliciousAlertsFilter />
          <SearchFieldAlerts />
        </div>
      </div>
      <div className="overflow-x-auto">
        <ResizableTableContainer>
          <Table data-testid="alerts-table" aria-label="Alerts table">
            <TableHeader>
              <Row>
                <Column isRowHeader width={150}>
                  Time
                </Column>
                <Column width={150}>Type</Column>
                <Column>Event</Column>
                <Column width={325}>Issue Detected</Column>
                <Column width={200}>Token usage</Column>
              </Row>
            </TableHeader>
            <TableBody>
              {dataView.map((alert) => {
                return (
                  <Row
                    key={alert.alert_id}
                    className="h-20"
                    onAction={() =>
                      navigate(`/prompt/${alert.conversation.chat_id}`)
                    }
                  >
                    <Cell className="truncate">
                      {formatDistanceToNow(new Date(alert.timestamp), {
                        addSuffix: true,
                      })}
                    </Cell>
                    <Cell className="truncate">
                      <TypeCellContent alert={alert} />
                    </Cell>
                    <Cell className="truncate">{getTitle(alert)}</Cell>
                    <Cell>
                      <div className="truncate flex gap-2  items-center">
                        <IssueDetectedCellContent alert={alert} />
                      </div>
                    </Cell>
                    <Cell>
                      <TableAlertTokenUsage
                        usage={alert.conversation.token_usage_agg}
                      />
                    </Cell>
                  </Row>
                );
              })}
            </TableBody>
          </Table>
        </ResizableTableContainer>
      </div>

      <div className="flex justify-center w-full p-4">
        <div className="flex gap-2">
          <Button isDisabled={!hasPreviousPage} onPress={prevPage}>
            Previous
          </Button>
          <Button isDisabled={!hasNextPage} onPress={nextPage}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
