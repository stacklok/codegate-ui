import { BreadcrumbHome } from '@/components/BreadcrumbHome'
import { ArchiveWorkspace } from '@/features/workspace/components/archive-workspace'
import { PageHeading } from '@/components/heading'
import { WorkspaceName } from '@/features/workspace/components/workspace-name'
import { Alert, Breadcrumb, Breadcrumbs } from '@stacklok/ui-kit'
import { useParams } from 'react-router-dom'
import { useArchivedWorkspaces } from '@/features/workspace/hooks/use-archived-workspaces'
import { useRestoreWorkspaceButton } from '@/features/workspace/hooks/use-restore-workspace-button'
import { WorkspaceCustomInstructions } from '@/features/workspace/components/workspace-custom-instructions'
import { WorkspaceMuxingModel } from '@/features/workspace/components/form-mux'
import { PageContainer } from '@/components/page-container'
import { WorkspaceActivateButton } from '@/features/workspace/components/workspace-activate-button'

function WorkspaceArchivedBanner({ name }: { name: string }) {
  const restoreButtonProps = useRestoreWorkspaceButton({ workspaceName: name })

  return (
    <Alert
      variant="warning"
      title="This workspace has been archived"
      className="mb-8 animate-in fade-in zoom-in-95"
      actionButtonProps={restoreButtonProps}
    >
      You can still view this workspace's configuration. To begin using it
      again, you must restore it.
    </Alert>
  )
}

export function RouteWorkspace() {
  const { name } = useParams()

  if (!name) throw Error('Workspace name is required')

  const { data: isArchived } = useArchivedWorkspaces<boolean>({
    select: (data) =>
      data?.workspaces.find((w) => w.name === name) !== undefined,
  })

  return (
    <PageContainer>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage Workspaces</Breadcrumb>
        <Breadcrumb>Workspace Settings</Breadcrumb>
      </Breadcrumbs>

      <PageHeading level={1} title={`Workspace settings for ${name}`}>
        <WorkspaceActivateButton isArchived={isArchived} workspaceName={name} />
      </PageHeading>

      {isArchived ? <WorkspaceArchivedBanner name={name} /> : null}

      <WorkspaceName
        isArchived={isArchived}
        className="mb-4"
        workspaceName={name}
      />
      <WorkspaceMuxingModel
        className="mb-4"
        isArchived={isArchived}
        workspaceName={name}
      />
      <WorkspaceCustomInstructions
        isArchived={isArchived}
        workspaceName={name}
        className="mb-4"
      />
      <ArchiveWorkspace isArchived={isArchived} workspaceName={name} />
    </PageContainer>
  )
}
