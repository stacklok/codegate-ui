import { client } from "@/api/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableRow, TableBody, TableCell, Table } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, LoaderCircle } from "lucide-react";

enum Status {
  CONNECTED = "Connected",
  NOT_CONNECTED = "Not connected",
}

type HealthResp = { status: "healthy" | null } | null;

const getStatus = async (): Promise<Status> => {
  const status = await client.get<HealthResp, unknown, true>({
    url: "/health",
    throwOnError: true,
  });

  if (status.data?.status === "healthy") return Status.CONNECTED;
  return Status.NOT_CONNECTED;
};

const useStatus = () =>
  useQuery({
    queryFn: getStatus,
    queryKey: ["getStatus"],
    refetchInterval: 1000,
    staleTime: 0,
    gcTime: 0,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

const StatusText = ({ status }: { status: Status }) => {
  switch (status) {
    case Status.CONNECTED:
      return (
        <div className="flex gap-2 items-center text-green-600 justify-end">
          {Status.CONNECTED} <CheckCircle2 className="size-4" />
        </div>
      );
    case Status.NOT_CONNECTED:
      return (
        <div className="flex gap-2 items-center text-gray-600 justify-end overflow-hidden">
          {Status.NOT_CONNECTED}{" "}
          <LoaderCircle className="size-4 animate-spin" />
        </div>
      );
    default: {
      status satisfies never;
    }
  }
};

export function CardCodegateStatus() {
  const { data: status } = useStatus();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>CodeGate Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow className="hover:transparent">
              <TableCell className="pl-0">CodeGate server</TableCell>
              <TableCell className="pr-0 text-end">
                <StatusText status={status ?? Status.NOT_CONNECTED} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
