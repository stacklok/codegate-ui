import { formatDistanceToNow } from "date-fns";
import {
  Cell,
  Column,
  Input,
  Row,
  SearchField,
  Table,
  TableBody,
  FieldGroup,
  TableHeader,
  SearchFieldClearButton,
  Badge,
  Button,
} from "@stacklok/ui-kit";
import { Switch } from "@stacklok/ui-kit";
import { AlertConversation } from "@/api/generated";
import { Tooltip, TooltipTrigger } from "@stacklok/ui-kit";
import { sanitizeQuestionPrompt, parsingPromptText } from "@/lib/utils";
import { Search } from "lucide-react";
import { useAlertSearch } from "@/hooks/useAlertSearch";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilteredAlerts } from "@/hooks/useAlertsData";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";

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

export function AlertsTable() {
  const {
    isMaliciousFilterActive,
    setIsMaliciousFilterActive,
    setSearch,
    search,
    page,
    nextPage,
    prevPage,
  } = useAlertSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: filteredAlerts = [] } = useFilteredAlerts();

  const { dataView, hasNextPage, hasPreviousPage } = useClientSidePagination(
    filteredAlerts,
    page,
    15,
  );

  const handleToggleFilter = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        searchParams.set("maliciousPkg", "true");
        searchParams.delete("search");
        setSearch("");
      } else {
        searchParams.delete("maliciousPkg");
      }
      setSearchParams(searchParams);
      setIsMaliciousFilterActive(isChecked);
    },
    [setSearchParams, setSearch, searchParams, setIsMaliciousFilterActive],
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        searchParams.set("search", value);
        searchParams.delete("maliciousPkg");
        setSearch(value);
        setIsMaliciousFilterActive(false);
      } else {
        searchParams.delete("search");
        setSearch("");
      }
      setSearchParams(searchParams);
    },
    [searchParams, setIsMaliciousFilterActive, setSearch, setSearchParams],
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
          <div className="flex items-center space-x-2">
            <TooltipTrigger>
              <Switch
                id="malicious-packages"
                isSelected={isMaliciousFilterActive}
                onChange={handleToggleFilter}
              >
                Malicious Packages
              </Switch>

              <Tooltip>
                <p>Filter by malicious packages</p>
              </Tooltip>
            </TooltipTrigger>
          </div>
          <SearchField
            type="text"
            aria-label="Search alerts"
            value={search}
            onChange={(value) => handleSearch(value.toLowerCase().trim())}
          >
            <FieldGroup>
              <Input
                type="search"
                placeholder="Search..."
                isBorderless
                icon={<Search />}
              />
              <SearchFieldClearButton />
            </FieldGroup>
          </SearchField>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table data-testid="alerts-table" aria-label="Alerts table">
          <TableHeader>
            <Row>
              <Column width={100}>Time</Column>
              <Column isRowHeader width={150}>
                Type
              </Column>
              <Column width={300}>Event</Column>
            </Row>
          </TableHeader>
          <TableBody>
            {dataView
              .map((alert) => (
                <Row key={alert.alert_id} className="h-20">
                  <Cell className="truncate">
                    {formatDistanceToNow(new Date(alert.timestamp), {
                      addSuffix: true,
                    })}
                  </Cell>
                  <Cell className="truncate">{alert.trigger_type}</Cell>
                  <Cell className="truncate">{getTitle(alert)}</Cell>
                </Row>
              ))}
          </TableBody>
        </Table>
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
