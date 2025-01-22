import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { ArchiveWorkspace } from "@/features/workspace/components/archive-workspace";
import { SystemPromptEditor } from "@/features/workspace-system-prompt/components/system-prompt-editor";
import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { WorkspaceName } from "@/features/workspace/components/workspace-name";
import { Alert, Breadcrumb, Breadcrumbs } from "@stacklok/ui-kit";
import { useParams } from "react-router-dom";
import { useArchivedWorkspaces } from "@/features/workspace/hooks/use-archived-workspaces";
import { useRestoreWorkspaceButton } from "@/features/workspace/hooks/use-restore-workspace-button";

function WorkspaceArchivedBanner({ name }: { name: string }) {
  const restoreButtonProps = useRestoreWorkspaceButton({ workspaceName: name });

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
  );
}

export function RouteWorkspace() {
  const { name } = useParams();

  if (!name) throw Error("Workspace name is required");

  const { data: isArchived } = useArchivedWorkspaces<boolean>({
    select: (data) =>
      data?.workspaces.find((w) => w.name === name) !== undefined,
  });

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage Workspaces</Breadcrumb>
        <Breadcrumb>Workspace Settings</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Workspace settings" />

      {isArchived ? <WorkspaceArchivedBanner name={name} /> : null}

      <WorkspaceName
        isArchived={isArchived}
        className="mb-4"
        workspaceName={name}
      />
      <SystemPromptEditor
        isArchived={isArchived}
        workspaceName={name}
        className="mb-4"
      />
      <ArchiveWorkspace isArchived={isArchived} workspaceName={name} />
    </>
  );
}
