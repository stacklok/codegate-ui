import { Card, CardBody, Button, Text } from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useArchiveWorkspace } from "../../workspace-system-prompt/hooks/use-archive-workspace";

export function ArchiveWorkspace({
  className,
  workspaceName,
}: {
  workspaceName: string;
  className?: string;
}) {
  const { mutate, isPending } = useArchiveWorkspace();

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

        <Button
          isDestructive
          isPending={isPending}
          onPress={() => {
            mutate({ path: { workspace_name: workspaceName } });
          }}
        >
          Archive
        </Button>
      </CardBody>
    </Card>
  );
}
