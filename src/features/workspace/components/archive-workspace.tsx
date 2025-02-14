import {
  Card,
  CardBody,
  Button,
  Text,
  TooltipTrigger,
  Tooltip,
  TooltipInfoButton,
} from '@stacklok/ui-kit'
import { twMerge } from 'tailwind-merge'
import { useRestoreWorkspaceButton } from '../hooks/use-restore-workspace-button'
import { useArchiveWorkspaceButton } from '../hooks/use-archive-workspace-button'
import { useConfirmHardDeleteWorkspace } from '../hooks/use-confirm-hard-delete-workspace'
import { useNavigate } from 'react-router-dom'
import { hrefs } from '@/lib/hrefs'
import { useQueryActiveWorkspaceName } from '../../../hooks/use-query-active-workspace-name'

function getContextualText({
  activeWorkspaceName,
  workspaceName,
}: {
  workspaceName: string
  activeWorkspaceName: string
}) {
  if (workspaceName === activeWorkspaceName) {
    return 'Cannot archive the active workspace'
  }
  if (workspaceName === 'default') {
    return 'Cannot archive the default workspace'
  }
  return null
}

// NOTE: You can't show a tooltip on a disabled button
// React Aria's recommended approach is https://spectrum.adobe.com/page/contextual-help/
function ContextualHelp({ workspaceName }: { workspaceName: string }) {
  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName()
  if (!activeWorkspaceName) return null

  const text = getContextualText({ activeWorkspaceName, workspaceName })
  if (!text) return null

  return (
    <TooltipTrigger delay={0}>
      <TooltipInfoButton aria-label="Contextual help" />
      <Tooltip>{text}</Tooltip>
    </TooltipTrigger>
  )
}

const ButtonsUnarchived = ({ workspaceName }: { workspaceName: string }) => {
  const archiveButtonProps = useArchiveWorkspaceButton({ workspaceName })

  return (
    <div className="flex items-center gap-2">
      <Button {...archiveButtonProps} />
      <ContextualHelp workspaceName={workspaceName} />
    </div>
  )
}

const ButtonsArchived = ({ workspaceName }: { workspaceName: string }) => {
  const restoreButtonProps = useRestoreWorkspaceButton({ workspaceName })
  const hardDelete = useConfirmHardDeleteWorkspace()

  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-1">
      <Button {...restoreButtonProps} variant="secondary" />
      <Button
        variant="primary"
        onPress={() =>
          hardDelete(
            { path: { workspace_name: workspaceName } },
            { onSuccess: () => navigate(hrefs.workspaces.all) }
          )
        }
        isDestructive
      >
        Permanently delete
      </Button>
    </div>
  )
}

export function ArchiveWorkspace({
  className,
  workspaceName,
  isArchived,
}: {
  workspaceName: string
  className?: string
  isArchived: boolean | undefined
}) {
  return (
    <Card className={twMerge(className, 'shrink-0')}>
      <CardBody className="flex items-center justify-between">
        <div>
          <Text className="text-primary">Archive Workspace</Text>
          <Text className="mb-0 flex items-center text-balance text-secondary">
            Archiving this workspace removes it from the main workspaces list,
            though it can be restored if needed.
          </Text>
        </div>

        {isArchived ? (
          <ButtonsArchived workspaceName={workspaceName} />
        ) : (
          <ButtonsUnarchived workspaceName={workspaceName} />
        )}
      </CardBody>
    </Card>
  )
}
