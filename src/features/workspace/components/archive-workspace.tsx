import { Card, CardBody, Button, Text } from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useRestoreWorkspaceButton } from "../hooks/use-restore-workspace-button";
import { useArchiveWorkspaceButton } from "../hooks/use-archive-workspace-button";
import { useConfirmHardDeleteWorkspace } from "../hooks/use-confirm-hard-delete-workspace";
import { useNavigate } from "react-router-dom";
import { hrefs } from "@/lib/hrefs";

const ButtonsUnarchived = ({ workspaceName }: { workspaceName: string }) => {
  const archiveButtonProps = useArchiveWorkspaceButton({ workspaceName });

  return <Button {...archiveButtonProps} />;
};

const ButtonsArchived = ({ workspaceName }: { workspaceName: string }) => {
  const restoreButtonProps = useRestoreWorkspaceButton({ workspaceName });
  const hardDelete = useConfirmHardDeleteWorkspace();

  const navigate = useNavigate();

  return (
    <div className="flex gap-1 items-center">
      <Button {...restoreButtonProps} variant="secondary" />
      <Button
        variant="primary"
        onPress={() =>
          hardDelete(
            { path: { workspace_name: workspaceName } },
            { onSuccess: () => navigate(hrefs.workspaces.all) },
          )
        }
        isDestructive
      >
        Delete permanently
      </Button>
    </div>
  );
};

export function ArchiveWorkspace({
  className,
  workspaceName,
  isArchived,
}: {
  workspaceName: string;
  className?: string;
  isArchived: boolean | undefined;
}) {
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

        {isArchived ? (
          <ButtonsArchived workspaceName={workspaceName} />
        ) : (
          <ButtonsUnarchived workspaceName={workspaceName} />
        )}
      </CardBody>
    </Card>
  );
}
