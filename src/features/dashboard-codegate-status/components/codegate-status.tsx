import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@stacklok/ui-kit";

import { format } from "date-fns";
import { useState } from "react";
import { useCodeGateStatus } from "../../header/hooks/use-codegate-status";
import { CodegateStatusErrorUI } from "./codegate-status-error-ui";
import {
  DEFAULT_INTERVAL,
  PollingInterval,
  PollIntervalControl,
} from "./codegate-status-polling-control";
import { CodegateStatusHealth } from "./codegate-status-health";
import { CodegateStatusVersion } from "./codegate-status-version";
import { CodeGateStatusRefreshButton } from "./codegate-status-refresh-button";

export function InnerContent({
  isError,
  isPending,
  data,
}: Pick<
  ReturnType<typeof useCodeGateStatus>,
  "data" | "isPending" | "isError"
>) {
  if (!isPending && isError) {
    return <CodegateStatusErrorUI />;
  }

  const { health, version } = data || {};

  return (
    <Table className="h-max" aria-label="CodeGate status checks">
      <TableHeader className="hidden">
        <Column isRowHeader>Name</Column>
        <Column>Value</Column>
      </TableHeader>
      <TableBody>
        <Row className="hover:bg-transparent">
          <Cell className="pl-0">CodeGate server</Cell>
          <Cell className="pr-0 text-end">
            <CodegateStatusHealth isPending={isPending} data={health ?? null} />
          </Cell>
        </Row>

        <Row className="hover:bg-transparent">
          <Cell className="pl-0">CodeGate version</Cell>
          <Cell className="pr-0 text-end">
            <CodegateStatusVersion
              isPending={isPending}
              data={version ?? null}
            />
          </Cell>
        </Row>
      </TableBody>
    </Table>
  );
}

export function CodegateStatus() {
  const [pollingInterval, setPollingInterval] = useState<PollingInterval>(
    () => DEFAULT_INTERVAL,
  );
  const { data, dataUpdatedAt, isPending, isError } =
    useCodeGateStatus(pollingInterval);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="block">CodeGate Status</span>
        </CardTitle>

        <CodeGateStatusRefreshButton
          className="ml-auto -mr-2"
          pollingInterval={pollingInterval}
        />
      </CardHeader>

      <CardBody className="h-max">
        <InnerContent data={data} isPending={isPending} isError={isError} />
      </CardBody>

      <CardFooter className="items-start border-t border-gray-200 mt-auto py-2">
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
