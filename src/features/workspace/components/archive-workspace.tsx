import { Card, CardBody, Button, Text } from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useRestoreWorkspaceButton } from "../hooks/use-restore-workspace-button";
import { useArchiveWorkspaceButton } from "../hooks/use-archive-workspace-button";

export function ArchiveWorkspace({
  className,
  workspaceName,
  isArchived,
}: {
  workspaceName: string;
  className?: string;
  isArchived: boolean | undefined;
}) {
  const restoreButtonProps = useRestoreWorkspaceButton({ workspaceName });
  const archiveButtonProps = useArchiveWorkspaceButton({ workspaceName });

  return (
    <Card className={twMerge(className, "shrink-0")}>
      <CardBody className="flex justify-between items-center">
        <div>
          <Text className="text-primary">Archive Workspace</Text>
          <Text className="flex items-center text-secondary mb-0">
            Archiving this workspace removes it from the main workspaces list,
            though it can be restored if needed.
          </Text>
        </div>

        <Button {...(isArchived ? restoreButtonProps : archiveButtonProps)} />
      </CardBody>
    </Card>
  );
}
