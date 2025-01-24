import { format } from "date-fns";
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
import { getMaliciousPackage } from "@/lib/utils";
import { Search } from "lucide-react";
import { Markdown } from "./Markdown";
import { useAlertSearch } from "@/hooks/useAlertSearch";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilteredAlerts } from "@/hooks/useAlertsData";
import { useClientSidePagination } from "@/hooks/useClientSidePagination";

const wrapObjectOutput = (input: AlertConversation["trigger_string"]) => {
  const data = getMaliciousPackage(input);
  if (data === null) return "N/A";
  if (typeof data === "string") {
    return (
      <div className="bg-gray-25 rounded-lg overflow-auto p-4">
        <Markdown>{data}</Markdown>
      </div>
    );
  }
  if (!data.type || !data.name) return "N/A";

  return (
    <div className="max-h-40 w-fit overflow-y-auto whitespace-pre-wrap p-2">
      <label className="font-medium">Package:</label>
      &nbsp;
      <a
        href={`https://www.insight.stacklok.com/report/${data.type}/${data.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-500 hover:underline"
      >
        {data.type}/{data.name}
      </a>
      {data.status && (
        <>
          <br />
          <label className="font-medium">Status:</label> {data.status}
        </>
      )}
      {data.description && (
        <>
          <br />
          <label className="font-medium">Description:</label> {data.description}
        </>
      )}
    </div>
  );
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
              <Column isRowHeader width={150}>
                Trigger Type
              </Column>
              <Column width={300}>Trigger Token</Column>
              <Column width={150}>File</Column>
              <Column width={250}>Code</Column>
              <Column width={100}>Timestamp</Column>
            </Row>
          </TableHeader>
          <TableBody>
            {dataView.map((alert) => (
              <Row key={alert.alert_id} className="h-20">
                <Cell className="truncate">{alert.trigger_type}</Cell>
                <Cell className="overflow-auto whitespace-nowrap max-w-80">
                  {wrapObjectOutput(alert.trigger_string)}
                </Cell>
                <Cell className="truncate">
                  {alert.code_snippet?.filepath || "N/A"}
                </Cell>
                <Cell className="overflow-auto whitespace-nowrap max-w-80">
                  {alert.code_snippet?.code ? (
                    <pre className="max-h-40 overflow-auto bg-gray-100 p-2 whitespace-pre-wrap">
                      <code>{alert.code_snippet.code}</code>
                    </pre>
                  ) : (
                    "N/A"
                  )}
                </Cell>
                <Cell className="truncate">
                  <div data-testid="date">
                    {format(new Date(alert.timestamp ?? ""), "y/MM/dd")}
                  </div>
                  <div data-testid="time">
                    {format(new Date(alert.timestamp ?? ""), "hh:mm:ss a")}
                  </div>
                </Cell>
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
