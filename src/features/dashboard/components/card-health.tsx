import { client } from "@/api/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableRow, TableBody, TableCell, Table } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Check, CheckCheck, CheckCircle, CheckCircle2, XCircle } from "lucide-react";

enum Status {
  HEALTHY = "Healthy",
  LOADING = "Loading",
  NOT_REACHABLE = "Not reachable",
}

type HealthResp = { status: "healthy" | null } | null;

const getStatus = async (): Promise<Status> => {
  const status = await client.get<HealthResp, unknown, true>({
    url: "/health",
    throwOnError: true,
  });

  if (status.data?.status === "healthy") return Status.HEALTHY;
  return Status.NOT_REACHABLE;
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
    case Status.HEALTHY:
      return (
        <div className="flex gap-2 items-center">
          {Status.HEALTHY} <Check className="size-4" />
        </div>
      );
    case Status.LOADING:
      return (
        <div className="flex gap-2 items-center">
          {Status.LOADING} <CheckCircle className="size-4" />
        </div>
      );
    case Status.NOT_REACHABLE:
      return (
        <div className="flex gap-2 items-center">
          {Status.NOT_REACHABLE} <XCircle className="size-4" />
        </div>
      );
    default: {
      status satisfies never;
    }
  }
};

export function CardHealth() {
  const { data: status, error: statusError } = useStatus();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>System health</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="truncate">System health</TableCell>
              <TableCell className="text-end">
                {status ? <StatusText status={status} /> : "Error"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="truncate">CA certificate</TableCell>
              <TableCell className="text-end">Trusted</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
