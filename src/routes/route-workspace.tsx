import { SystemPromptEditor } from "@/features/workspace-system-prompt/components/system-prompt-editor";
import { WorkspaceName } from "@/features/workspace/components/workspace-name";
import { Heading } from "@stacklok/ui-kit";

export function RouteWorkspace() {
  return (
    <>
      <Heading level={1}>Workspace settings</Heading>
      <WorkspaceName className="mb-4" />
      <SystemPromptEditor className="mb-4" />
    </>
  );
}
