import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import { WorkspaceCreation } from "@/features/workspace/components/workspace-creation";
import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { Breadcrumbs, Breadcrumb } from "@stacklok/ui-kit";

export function RouteWorkspaceCreation() {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage Workspaces</Breadcrumb>
        <Breadcrumb>Create Workspace</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Create Workspace" />
      <WorkspaceCreation />
    </>
  );
}
