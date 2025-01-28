import { AlertCircle, CheckCircle2, ShieldCheck, ShieldX } from "lucide-react";
import { useCodeGateStatus } from "../hooks/use-codegate-status";
import { HealthStatus } from "../types";
import { Button, DialogTrigger, Loader, Popover } from "@stacklok/ui-kit";

import { ReactNode } from "react";

type CodeGateStatus =
  | "healthy"
  | "update_available"
  | "unhealthy"
  | "loading"
  | "error_checking_status";

function deriveOverallStatus(
  data: ReturnType<typeof useCodeGateStatus>["data"],
  isPending: boolean,
  isError: boolean,
): CodeGateStatus {
  if (isPending) return "loading";
  if (isError) return "error_checking_status";

  if (
    data?.health === HealthStatus.HEALTHY &&
    data.version?.is_latest === false
  )
    return "update_available";

  if (data?.health === HealthStatus.HEALTHY) return "healthy";

  return "unhealthy";
}

type CodeGateVersionStatus =
  | "up_to_date"
  | "update_available"
  | "loading"
  | "error_checking_version";

function deriveVersionStatus(
  data: ReturnType<typeof useCodeGateStatus>["data"],
  isPending: boolean,
  isError: boolean,
): CodeGateVersionStatus {
  if (isPending) return "loading";
  if (isError || data?.version?.error) return "error_checking_version";

  if (data?.version?.is_latest === false) return "update_available";
  return "up_to_date";
}

type CodeGateHealthCheckStatus =
  | "healthy"
  | "unhealthy"
  | "loading"
  | "error_checking_health";

function deriveHealthCheckStatus(
  data: ReturnType<typeof useCodeGateStatus>["data"],
  isPending: boolean,
  isError: boolean,
): CodeGateHealthCheckStatus {
  if (isPending) return "loading";
  if (isError) return "error_checking_health";

  if (data?.health == HealthStatus.HEALTHY) return "healthy";
  return "unhealthy";
}

function getButtonText(status: CodeGateStatus): string {
  switch (status) {
    case "error_checking_status":
      return "Error";
    case "healthy":
      return "Healthy";
    case "loading":
      return "Loading";
    case "unhealthy":
      return "Unhealthy";
    case "update_available":
      return "Update available";
    default:
      return status satisfies never;
  }
}

function getHealthCheckText(status: CodeGateHealthCheckStatus): string {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "loading":
      return "Loading";
    case "error_checking_health":
      return "Error";
    case "unhealthy":
      return "Unhealthy";
    default:
      return status satisfies never;
  }
}

function getVersionText(status: CodeGateVersionStatus): string {
  switch (status) {
    case "error_checking_version":
      return "Error";
    case "loading":
      return "Loading";
    case "up_to_date":
      return "Up to date";
    case "update_available":
      return "Update available";
    default:
      return status satisfies never;
  }
}

function ButtonIcon({
  status,
  className,
}: {
  status: CodeGateStatus;
  className?: string;
}) {
  switch (status) {
    case "error_checking_status":
      return <AlertCircle className={className} />;
    case "healthy":
      return <ShieldCheck className={className} />;
    case "loading":
      return <Loader className={className} />;
    case "unhealthy":
      return <ShieldX className={className} />;
    case "update_available":
      return <ShieldX className={className} />;
    default:
      return status satisfies never;
  }
}

function HealthCheckIcon({
  healthCheckStatus,
  className,
}: {
  healthCheckStatus: CodeGateHealthCheckStatus;
  className?: string;
}): ReactNode {
  switch (healthCheckStatus) {
    case "error_checking_health":
    case "unhealthy":
      return <AlertCircle className={className} />;
    case "healthy":
      return <CheckCircle2 className={className} />;
    case "loading":
      return <Loader className={className} />;
    default:
      return healthCheckStatus satisfies never;
  }
}

function VersionIcon({
  versionStatus: versionStatus,
  className,
}: {
  versionStatus: CodeGateVersionStatus;
  className?: string;
}) {
  switch (versionStatus) {
    case "error_checking_version":
      return <AlertCircle className={className} />;
    case "update_available":
      return <AlertCircle className={className} />;
    case "up_to_date":
      return <CheckCircle2 className={className} />;
    case "loading":
      return <Loader className={className} />;
    default:
      return versionStatus satisfies never;
  }
}

function ButtonContent({
  status,
  isPending,
}: {
  status: CodeGateStatus;
  isPending: boolean;
}) {
  return (
    <Button variant="tertiary" className="flex gap-1 items-center">
      {getButtonText(status)}{" "}
      {isPending ? (
        <Loader className="size-4" />
      ) : (
        <ButtonIcon status={status} className="size-4" />
      )}
    </Button>
  );
}

function Row({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="py-1 my-1 flex items-center justify-between">
      <div className="text-secondary">{title}</div>
      <div className="text-primary flex gap-1 items-center">
        {value} {icon}
      </div>
    </div>
  );
}

function StatusPopover({
  versionStatus,
  healthCheckStatus,
}: {
  versionStatus: CodeGateVersionStatus;
  healthCheckStatus: CodeGateHealthCheckStatus;
}) {
  return (
    <Popover className="px-3 py-2 min-w-64" placement="bottom end">
      <Row
        title="CodeGate server"
        value={getHealthCheckText(healthCheckStatus)}
        icon={
          <HealthCheckIcon
            className="size-4"
            healthCheckStatus={healthCheckStatus}
          />
        }
      />
      <Row
        title="Updates"
        value={getVersionText(versionStatus)}
        icon={<VersionIcon className="size-4" versionStatus={versionStatus} />}
      />
    </Popover>
  );
}

export function HeaderStatusMenu() {
  const { data, isPending, isError } = useCodeGateStatus();

  const status = deriveOverallStatus(data, isPending, isError);
  const versionStatus = deriveVersionStatus(data, isPending, isError);
  const healthCheckStatus = deriveHealthCheckStatus(data, isPending, isError);

  return (
    <DialogTrigger>
      <ButtonContent status={status} isPending={isPending} />
      <StatusPopover
        healthCheckStatus={healthCheckStatus}
        versionStatus={versionStatus}
      />
    </DialogTrigger>
  );
}
