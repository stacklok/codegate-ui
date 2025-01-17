import { SystemPromptEditor } from "@/features/workspace-system-prompt/components/system-prompt-editor";
import { Heading } from "@stacklok/ui-kit";

export function RouteWorkspace() {
  return (
    <>
      <Heading level={1}>Workspace: foo</Heading>
      <SystemPromptEditor />
    </>
  );
}
