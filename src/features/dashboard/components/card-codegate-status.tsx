import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableRow, TableBody, TableCell, Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  CheckCircle2,
  LoaderCircle,
  XCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const INTERVAL = {
  "1_SEC": { value: 1_000, name: "1 second" },
  "5_SEC": { value: 5_000, name: "5 seconds" },
  "10_SEC": { value: 10_000, name: "10 seconds" },
  "30_SEC": { value: 30_000, name: "30 seconds" },
  "1_MIN": { value: 60_000, name: "1 minute" },
  "5_MIN": { value: 300_000, name: "5 minutes" },
  "10_MIN": { value: 600_000, name: "10 minutes" },
} as const;

const DEFAULT_INTERVAL: Interval = "5_SEC";

type Interval = keyof typeof INTERVAL;

enum Status {
  HEALTHY = "Healthy",
  UNHEALTHY = "Unhealthy",
}

type HealthResp = { status: "healthy" | unknown } | null;

const getStatus = async (): Promise<Status | null> => {
  const resp = await fetch(
    new URL("/health", import.meta.env.VITE_BASE_API_URL),
  );
  const data = (await resp.json()) as unknown as HealthResp;

  if (data?.status === "healthy") return Status.HEALTHY;
  if (data?.status !== "healthy") return Status.UNHEALTHY;

  return null;
};

const useStatus = (pollingInterval: Interval) =>
  useQuery({
    queryFn: getStatus,
    queryKey: ["getStatus", { pollingInterval }],
    refetchInterval: INTERVAL[pollingInterval].value,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: false,
  });

const StatusText = ({
  status,
  isPending,
}: {
  status: Status | null;
  isPending: boolean;
}) => {
  if (isPending || status === null) {
    return (
      <div className="flex gap-2 items-center text-gray-600 justify-end overflow-hidden">
        Checking <LoaderCircle className="size-4 animate-spin" />
      </div>
    );
  }

  switch (status) {
    case Status.HEALTHY:
      return (
        <div className="flex gap-2 items-center text-green-600 justify-end">
          {Status.HEALTHY} <CheckCircle2 className="size-4" />
        </div>
      );
    case Status.UNHEALTHY:
      return (
        <div className="flex gap-2 items-center text-red-600 justify-end overflow-hidden">
          {Status.UNHEALTHY} <XCircle className="size-4" />
        </div>
      );
    default: {
      status satisfies never;
    }
  }
};

function ErrorUI() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <XCircle className="text-red-600 mb-2 size-8" />
      <div className="text-md font-semibold text-gray-600 text-center">
        An error occurred
      </div>
      <div className="text-sm text-gray-600 text-center text-balance">
        If this issue persists, please reach out to us on{" "}
        <a
          className="underline text-gray-700"
          href="https://discord.gg/stacklok"
        >
          Discord
        </a>{" "}
        or open a new{" "}
        <a
          className="underline text-gray-700"
          href="https://github.com/stacklok/codegate/issues/new"
        >
          Github issue
        </a>
      </div>
    </div>
  );
}

function PollIntervalControl({
  className,
  pollingInterval,
  setPollingInterval,
}: {
  className?: string;
  pollingInterval: Interval;
  setPollingInterval: Dispatch<SetStateAction<Interval>>;
}) {
  return (
    <div className={cn("flex items-center relative group", className)}>
      <div className="text-gray-600 hover:text-gray-800 font-normal cursor-pointer text-base px-2 py-1 rounded-md hover:bg-blue-50 transition-colors flex gap-1 items-center">
        <div>
          <div className="text-sm font-semibold text-gray-500 text-right">
            Check for updates
          </div>
          <div className="text-sm text-gray-500 text-right">
            every {INTERVAL[pollingInterval].name}
          </div>
        </div>
        <ChevronDown className="size-4" />
      </div>
      <div className="p-1 absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
        {Object.entries(INTERVAL).map(([key, { name }]) => {
          const isActive = key === pollingInterval;

          return (
            <button
              onClick={() => setPollingInterval(key as Interval)}
              data-active={isActive}
              className="text-right :not:last:mb-1 font-normal text-sm text-gray-600 hover:bg-gray-100 rounded px-2 py-0.5 hover:text-gray-800 &[data-active=true]:text-gray-800 flex items-center justify-between w-full"
              key={key}
            >
              {name}
              {isActive ? <Check className="size-3" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function InnerContent({
  isError,
  isPending,
  data,
}: Pick<ReturnType<typeof useStatus>, "data" | "isPending" | "isError">) {
  if (!isPending && isError) {
    return <ErrorUI />;
  }

  return (
    <Table className="h-max">
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell className="pl-0">CodeGate server</TableCell>
          <TableCell className="pr-0 text-end">
            <StatusText isPending={isPending} status={data ?? null} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function CardCodegateStatus() {
  const [pollingInterval, setPollingInterval] = useState<Interval>(
    () => DEFAULT_INTERVAL,
  );
  const { data, dataUpdatedAt, isPending, isError } =
    useStatus(pollingInterval);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="block">CodeGate Status</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-max">
        <InnerContent data={data} isPending={isPending} isError={isError} />
      </CardContent>

      <CardFooter className="border-t border-gray-200 mt-auto py-2 pr-2">
        <div>
          <div className="text-sm font-semibold text-gray-500">
            Last checked
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(dataUpdatedAt), "pp")}
          </div>
        </div>

        <PollIntervalControl
          className="ml-auto"
          pollingInterval={pollingInterval}
          setPollingInterval={setPollingInterval}
        />
      </CardFooter>
    </Card>
  );
}
