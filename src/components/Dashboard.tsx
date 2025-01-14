import { Separator } from "./ui/separator";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useCallback, useEffect } from "react";
import { BarChart } from "@/viz/BarChart";
import { LineChart } from "@/viz/LineChart";
import { useAlertsStore } from "@/hooks/useAlertsStore";
import { Markdown } from "./Markdown";
import { PieChart } from "@/viz/PieChart";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useSearchParams } from "react-router-dom";
import { AlertConversation } from "@/api/generated";
import { getMaliciousPackage } from "@/lib/utils";
import { CardCodegateStatus } from "@/features/dashboard/components/card-codegate-status";

const wrapObjectOutput = (input: AlertConversation["trigger_string"]) => {
  const data = getMaliciousPackage(input);
  if (data === null) return "N/A";
  if (typeof data === "string") {
    return (
      <Markdown className="bg-secondary rounded-lg overflow-auto w-fit p-1">
        {data}
      </Markdown>
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
        className="text-blue-500 hover:underline"
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
        <CardCodegateStatus />
        <BarChart data={alerts} loading={loading} />
        <PieChart data={maliciousPackages} loading={loading} />
        <LineChart data={alerts} loading={loading} />
      </div>

      <Separator className="my-8" />

      <div className="flex mb-2 mx-2 justify-between w-[calc(100vw-20rem)]">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold font-lg">All Alerts</h2>
          <Badge data-testid="alerts-count">{filteredAlerts.length}</Badge>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    checked={isMaliciousFilterActive}
                    onCheckedChange={handleToggleFilter}
                  />
                  <label htmlFor="airplane-mode" className="text-sm">
                    Malicious Packages
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by malicious packages</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            icon={
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value.toLowerCase().trim())}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table data-testid="alerts-table">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Trigger Type</TableHead>
              <TableHead className="w-[300px]">Trigger Token</TableHead>
              <TableHead className="w-[150px]">File</TableHead>
              <TableHead className="w-[250px]">Code</TableHead>
              <TableHead className="w-[100px]">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.alert_id} className="h-20">
                <TableCell className="truncate">{alert.trigger_type}</TableCell>
                <TableCell className="overflow-auto whitespace-nowrap max-w-80">
                  {wrapObjectOutput(alert.trigger_string)}
                </TableCell>
                <TableCell className="truncate">
                  {alert.code_snippet?.filepath || "N/A"}
                </TableCell>
                <TableCell className="overflow-auto whitespace-nowrap max-w-80">
                  {alert.code_snippet?.code ? (
                    <pre className="max-h-40 overflow-auto bg-gray-100 p-2 whitespace-pre-wrap">
                      <code>{alert.code_snippet.code}</code>
                    </pre>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="truncate">
                  <div data-testid="date">
                    {format(new Date(alert.timestamp ?? ""), "y/MM/dd")}
                  </div>
                  <div data-testid="time">
                    {format(new Date(alert.timestamp ?? ""), "hh:mm:ss a")}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
