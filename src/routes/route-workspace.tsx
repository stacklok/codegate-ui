import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { SystemPromptEditor } from "@/features/workspace-system-prompt/components/system-prompt-editor";
import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { WorkspaceName } from "@/features/workspace/components/workspace-name";
import { Breadcrumb, Breadcrumbs } from "@stacklok/ui-kit";

export function RouteWorkspace() {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage Workspaces</Breadcrumb>
        <Breadcrumb>Workspace Settings</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Workspace settings" />
      <WorkspaceName className="mb-4" />
      <SystemPromptEditor className="mb-4" />
    </>
  );
}
