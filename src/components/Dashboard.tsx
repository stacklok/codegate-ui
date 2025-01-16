import { Separator } from "./ui/separator";

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
} from "@stacklok/ui-kit";
import { useCallback, useEffect } from "react";
import { BarChart } from "@/viz/BarChart";
import { LineChart } from "@/viz/LineChart";
import { useAlertsStore } from "@/hooks/useAlertsStore";
import { Markdown } from "./Markdown";
import { PieChart } from "@/viz/PieChart";
import { Switch } from "@stacklok/ui-kit";
import { Tooltip, TooltipTrigger } from "@stacklok/ui-kit";
import { useSearchParams } from "react-router-dom";
import { AlertConversation } from "@/api/generated";
import { getMaliciousPackage } from "@/lib/utils";
import { CodegateStatus } from "@/features/dashboard-codegate-status/components/codegate-status";
import { Search } from "lucide-react";

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

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    alerts,
    loading,
    fetchAlerts,
    filteredAlerts,
    getMaliciousPackagesChart,
    isMaliciousFilterActive,
    toggleMaliciousFilter,
    setSearch,
    search,
  } = useAlertsStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    const isMaliciousFilterActive = searchParams.get("maliciousPkg") === "true";
    const searchFilterParam = searchParams.get("search");
    if (isMaliciousFilterActive && alerts.length > 0) {
      toggleMaliciousFilter(true);
    }
    if (searchFilterParam && alerts.length > 0) {
      setSearch(searchFilterParam);
    }
  }, [searchParams, toggleMaliciousFilter, setSearch, alerts]);

  const maliciousPackages = getMaliciousPackagesChart();

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
      toggleMaliciousFilter(isChecked);
    },
    [setSearchParams, setSearch, searchParams, toggleMaliciousFilter],
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        searchParams.set("search", value);
        searchParams.delete("maliciousPkg");
        setSearch(value);
        toggleMaliciousFilter(false);
      } else {
        searchParams.delete("search");
        setSearch("");
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearch, setSearchParams, toggleMaliciousFilter],
  );

  return (
    <div className="flex-col">
      <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 items-stretch gap-4 w-full">
        <CodegateStatus />
        <BarChart data={alerts} loading={loading} />
        <PieChart data={maliciousPackages} loading={loading} />
        <LineChart data={alerts} loading={loading} />
      </div>

      <Separator className="my-8" />

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
            {filteredAlerts.map((alert) => (
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
    </div>
  );
}
