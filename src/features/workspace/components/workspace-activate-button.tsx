import { useMutationActivateWorkspace } from '@/hooks/use-mutation-activate-workspace'
import { useQueryActiveWorkspaceName } from '@/hooks/use-query-active-workspace-name'
import {
  Button,
  Tooltip,
  TooltipInfoButton,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { Check } from '@untitled-ui/icons-react'

function getTooltipText({
  isActivated,
  isArchived,
}: {
  isArchived: boolean
  isActivated: boolean
}) {
  if (isArchived) {
    return 'Cannot activate an archived workspace'
  }

  if (isActivated) {
    return 'Workspace already active'
  }

  return null
}

function TooltipActivateBtn({
  isActivated,
  isArchived,
}: {
  isActivated: boolean
  isArchived: boolean
}) {
  const text = getTooltipText({ isActivated, isArchived })

  if (!text) return null
  return (
    <TooltipTrigger delay={0}>
      <TooltipInfoButton aria-label="Context active button" />
      <Tooltip>{text}</Tooltip>
    </TooltipTrigger>
  )
}

export function WorkspaceActivateButton({
  workspaceName,
  isArchived,
}: {
  workspaceName: string
  isArchived: boolean | undefined
}) {
  const { data: activeWorkspaceName, isPending: isPendingWsName } =
    useQueryActiveWorkspaceName()
  const { mutateAsync: activateWorkspace, isPending: isPendingMutation } =
    useMutationActivateWorkspace()
  const isActivated = activeWorkspaceName === workspaceName
  const isPending = isPendingWsName || isPendingMutation

  return (
    <div
      className="flex items-center justify-end gap-2"
      data-testid="workspace-activate"
    >
      <Button
        isDisabled={isActivated || isArchived}
        isPending={isPending}
        type="submit"
        onPress={() => activateWorkspace({ body: { name: workspaceName } })}
      >
        <Check /> Activate
      </Button>
      <TooltipActivateBtn isActivated={isActivated} isArchived={!!isArchived} />
    </div>
  )
}
