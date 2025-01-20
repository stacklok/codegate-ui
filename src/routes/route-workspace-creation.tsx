import { WorkspaceCreation } from "@/features/workspace/components/workspace-creation";
import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";

export function RouteWorkspaceCreation() {
  return (
    <>
      <WorkspaceHeading title="Create Workspace" />
      <WorkspaceCreation />
    </>
  );
}
