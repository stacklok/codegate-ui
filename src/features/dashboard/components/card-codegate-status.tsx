import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Cell,
  Column,
  Label,
  Row,
  Select,
  SelectButton,
  Table,
  TableBody,
  TableHeader,
  TDropdownItemOrSection,
} from "@stacklok/ui-kit-mono";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

const INTERVAL = {
  "1_SEC": { value: 1_000, name: "1 second" },
  "5_SEC": { value: 5_000, name: "5 seconds" },
  "10_SEC": { value: 10_000, name: "10 seconds" },
  "30_SEC": { value: 30_000, name: "30 seconds" },
  "1_MIN": { value: 60_000, name: "1 minute" },
  "5_MIN": { value: 300_000, name: "5 minutes" },
  "10_MIN": { value: 600_000, name: "10 minutes" },
} as const;

const INTERVAL_SELECT_ITEMS: TDropdownItemOrSection[] = Object.entries(
  INTERVAL
).map(([key, { name }]) => {
  return { textValue: name, id: key };
});

const DEFAULT_INTERVAL: Interval = "5_SEC";

type Interval = keyof typeof INTERVAL;

enum Status {
  HEALTHY = "Healthy",
  UNHEALTHY = "Unhealthy",
}

type HealthResp = { status: "healthy" | unknown } | null;

const getStatus = async (): Promise<Status | null> => {
  const resp = await fetch(
    new URL("/health", import.meta.env.VITE_BASE_API_URL)
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
      <div className="flex gap-2 items-center text-secondary justify-end overflow-hidden">
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
      <div className="text-md font-semibold text-secondary text-center">
        An error occurred
      </div>
      <div className="text-sm text-secondary text-center text-balance">
        If this issue persists, please reach out to us on{" "}
        <a
          className="underline text-secondary"
          href="https://discord.gg/stacklok"
          rel="noopener noreferrer"
          target="_blank"
        >
          Discord
        </a>{" "}
        or open a new{" "}
        <a
          className="underline text-secondary"
          href="https://github.com/stacklok/codegate/issues/new"
          rel="noopener noreferrer"
          target="_blank"
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
    <Select
      className={twMerge("flex items-center gap-1",className)}
      onSelectionChange={(v) => setPollingInterval(v.toString() as Interval)}
      items={INTERVAL_SELECT_ITEMS}
      defaultSelectedKey={pollingInterval}
    >
      <Label>Check for updates</Label>
      <SelectButton />
    </Select>
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
      <TableHeader className="hidden">
        <Column isRowHeader>Name</Column>
        <Column>Value</Column>
      </TableHeader>
      <TableBody>
        <Row className="hover:bg-transparent">
          <Cell className="pl-0">CodeGate server</Cell>
          <Cell className="pr-0 text-end">
            <StatusText isPending={isPending} status={data ?? null} />
          </Cell>
        </Row>
      </TableBody>
    </Table>
  );
}

export function CardCodegateStatus() {
  const [pollingInterval, setPollingInterval] = useState<Interval>(
    () => DEFAULT_INTERVAL
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

      <CardBody className="h-max">
        <InnerContent data={data} isPending={isPending} isError={isError} />
      </CardBody>

      <CardFooter className="border-t border-gray-200 mt-auto py-2 pr-2">
        <div>
          <div className="text-sm font-semibold text-secondary">
            Last checked
          </div>
          <div className="text-sm text-secondary">
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
