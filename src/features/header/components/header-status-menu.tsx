import { useQueriesCodegateStatus } from '../hooks/use-queries-codegate-status'
import {
  Button,
  DialogTrigger,
  Loader,
  Link,
  Popover,
  Tooltip,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { Dialog } from 'react-aria-components'

import { ReactNode } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ShieldOff,
  ShieldTick,
} from '@untitled-ui/icons-react'

type CodeGateStatus =
  | 'healthy'
  | 'update_available'
  | 'unhealthy'
  | 'loading'
  | 'error_checking_status'

type CodeGateVersionStatus =
  | 'up_to_date'
  | 'update_available'
  | 'loading'
  | 'error_checking_version'

type CodeGateHealthCheckStatus =
  | 'healthy'
  | 'unhealthy'
  | 'loading'
  | 'error_checking_health'

function deriveOverallStatus(
  data: ReturnType<typeof useQueriesCodegateStatus>['data'],
  isPending: boolean,
  isError: boolean
): CodeGateStatus {
  if (isPending) return 'loading'
  if (isError) return 'error_checking_status'

  if (
    data?.health?.status === 'healthy' &&
    data.version?.error === null &&
    data.version?.is_latest === false
  )
    return 'update_available'

  if (data?.health?.status === 'healthy') return 'healthy'

  return 'unhealthy'
}

function deriveVersionStatus(
  data: ReturnType<typeof useQueriesCodegateStatus>['data'],
  isPending: boolean,
  isError: boolean
): CodeGateVersionStatus {
  if (isPending) return 'loading'
  if (isError || data?.version?.error) return 'error_checking_version'

  if (data?.version?.is_latest === false) return 'update_available'
  return 'up_to_date'
}

function deriveHealthCheckStatus(
  data: ReturnType<typeof useQueriesCodegateStatus>['data'],
  isPending: boolean,
  isError: boolean
): CodeGateHealthCheckStatus {
  if (isPending) return 'loading'
  if (isError) return 'error_checking_health'

  if (data?.health?.status === 'healthy') return 'healthy'
  return 'unhealthy'
}

function getButtonText(status: CodeGateStatus): string {
  switch (status) {
    case 'error_checking_status':
      return 'Error'
    case 'healthy':
      return 'Service healthy'
    case 'loading':
      return 'Loading'
    case 'unhealthy':
      return 'Service unhealthy'
    case 'update_available':
      return 'Update available'
    default:
      return status satisfies never
  }
}

function getVersionText(
  status: CodeGateVersionStatus,
  data: ReturnType<typeof useQueriesCodegateStatus>['data']
): ReactNode {
  switch (status) {
    case 'error_checking_version':
      return 'Error'
    case 'loading':
      return 'Loading'
    case 'up_to_date':
      return 'Up to date'
    case 'update_available':
      return (
        <TooltipTrigger delay={0}>
          <Link
            className="flex items-center justify-end gap-2 overflow-hidden text-primary"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.codegate.ai/how-to/install#upgrade-codegate"
          >
            Update available
          </Link>
          <Tooltip className="text-right">
            <span className="block">
              Current version: {data?.version?.current_version}
            </span>
            <span className="block">
              Latest version: {data?.version?.latest_version}
            </span>
          </Tooltip>
        </TooltipTrigger>
      )
    default:
      return status satisfies never
  }
}

function getHealthCheckText(status: CodeGateHealthCheckStatus): string {
  switch (status) {
    case 'healthy':
      return 'Healthy'
    case 'loading':
      return 'Loading'
    case 'error_checking_health':
      return 'Error'
    case 'unhealthy':
      return 'Unhealthy'
    default:
      return status satisfies never
  }
}

function ButtonIcon({
  status,
  className,
}: {
  status: CodeGateStatus
  className?: string
}) {
  switch (status) {
    case 'error_checking_status':
      return <AlertCircle className={className} />
    case 'healthy':
      return <ShieldTick className={className} />
    case 'loading':
      return <Loader className={className} />
    case 'unhealthy':
      return <ShieldOff className={className} />
    case 'update_available':
      return <AlertTriangle className={className} />
    default:
      return status satisfies never
  }
}

function HealthCheckIcon({
  healthCheckStatus,
  className,
}: {
  healthCheckStatus: CodeGateHealthCheckStatus
  className?: string
}): ReactNode {
  switch (healthCheckStatus) {
    case 'error_checking_health':
    case 'unhealthy':
      return <AlertCircle className={className} />
    case 'healthy':
      return <CheckCircle className={className} />
    case 'loading':
      return <Loader className={className} />
    default:
      return healthCheckStatus satisfies never
  }
}

function VersionIcon({
  versionStatus: versionStatus,
  className,
}: {
  versionStatus: CodeGateVersionStatus
  className?: string
}) {
  switch (versionStatus) {
    case 'error_checking_version':
      return <AlertCircle className={className} />
    case 'update_available':
      return <AlertCircle className={className} />
    case 'up_to_date':
      return <CheckCircle className={className} />
    case 'loading':
      return <Loader className={className} />
    default:
      return versionStatus satisfies never
  }
}

function StatusMenuTrigger({
  status,
  isPending,
}: {
  status: CodeGateStatus
  isPending: boolean
}) {
  return (
    <Button variant="tertiary" className="flex items-center gap-1">
      {getButtonText(status)}{' '}
      {isPending ? (
        <Loader className="size-4" />
      ) : (
        <ButtonIcon status={status} className="size-4" />
      )}
    </Button>
  )
}

function Row({
  title,
  value,
  icon,
}: {
  title: string
  value: ReactNode
  icon: ReactNode
}) {
  return (
    <div className="mb-2 flex items-center justify-between py-1 last:mb-0">
      <div className="text-secondary">{title}</div>
      <div className="flex items-center gap-1 text-primary">
        {value} {icon}
      </div>
    </div>
  )
}

function StatusPopover({
  versionStatus,
  healthCheckStatus,
  data,
}: {
  versionStatus: CodeGateVersionStatus
  healthCheckStatus: CodeGateHealthCheckStatus
  data: ReturnType<typeof useQueriesCodegateStatus>['data']
}) {
  return (
    <Popover className="min-w-64 px-3 py-2" placement="bottom end">
      <Dialog aria-label="CodeGate Status" style={{ outline: 0 }}>
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
          value={getVersionText(versionStatus, data)}
          icon={
            <VersionIcon className="size-4" versionStatus={versionStatus} />
          }
        />
      </Dialog>
    </Popover>
  )
}

export function HeaderStatusMenu() {
  const { data, isPending, isError } = useQueriesCodegateStatus()

  const status = deriveOverallStatus(data, isPending, isError)
  const versionStatus = deriveVersionStatus(data, isPending, isError)
  const healthCheckStatus = deriveHealthCheckStatus(data, isPending, isError)

  return (
    <DialogTrigger>
      <StatusMenuTrigger status={status} isPending={isPending} />
      <StatusPopover
        healthCheckStatus={healthCheckStatus}
        versionStatus={versionStatus}
        data={data}
      />
    </DialogTrigger>
  )
}
