import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { ArchiveWorkspace } from "@/features/workspace/components/archive-workspace";
import { SystemPromptEditor } from "@/features/workspace-system-prompt/components/system-prompt-editor";
import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { WorkspaceName } from "@/features/workspace/components/workspace-name";
import { Breadcrumb, Breadcrumbs } from "@stacklok/ui-kit";
import { useParams } from "react-router-dom";

export function RouteWorkspace() {
  const { name } = useParams();

  if (!name) throw Error("Workspace name is required");

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage Workspaces</Breadcrumb>
        <Breadcrumb>Workspace Settings</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Workspace settings" />
      <WorkspaceName className="mb-4" workspaceName={name} />
      <SystemPromptEditor className="mb-4" />
      <ArchiveWorkspace workspaceName={name} />
    </>
  );
}
