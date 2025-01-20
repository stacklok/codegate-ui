import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { SystemPromptEditor } from "@/features/workspace-system-prompt/components/system-prompt-editor";
import { WorkspaceName } from "@/features/workspace/components/workspace-name";
import { Breadcrumb, Breadcrumbs, Heading } from "@stacklok/ui-kit";

export function RouteWorkspace() {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage Workspaces</Breadcrumb>
        <Breadcrumb>Workspace Settings</Breadcrumb>
      </Breadcrumbs>

      <Heading level={1}>Workspace settings</Heading>
      <WorkspaceName className="mb-4" />
      <SystemPromptEditor className="mb-4" />
    </>
  );
}
