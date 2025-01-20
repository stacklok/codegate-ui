import { LoaderCircle, CheckCircle2, XCircle } from "lucide-react";
import { HealthStatus } from "../types";

export const CodegateStatusHealth = ({
  data: data,
  isPending,
}: {
  data: HealthStatus | null;
  isPending: boolean;
}) => {
  if (isPending || data === null) {
    return (
      <div className="flex gap-2 items-center text-secondary justify-end overflow-hidden">
        Checking <LoaderCircle className="size-4 shrink-0 animate-spin" />
      </div>
    );
  }

  switch (data) {
    case HealthStatus.HEALTHY:
      return (
        <div className="flex gap-2 items-center text-primary justify-end">
          {HealthStatus.HEALTHY} <CheckCircle2 className="size-4 shrink-0" />
        </div>
      );
    case HealthStatus.UNHEALTHY:
      return (
        <div className="flex gap-2 items-center text-primary justify-end overflow-hidden">
          {HealthStatus.UNHEALTHY} <XCircle className="size-4 shrink-0" />
        </div>
      );
    default: {
      data satisfies never;
    }
  }
};
