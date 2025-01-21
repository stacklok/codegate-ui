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
      <CardBody>
        <Text className="text-primary">Archive Workspace</Text>
        <div className="flex justify-between items-center">
          <Text className="flex items-center text-secondary mb-0">
            Archiving this workspace removes it from the main workspaces list,
            though it can be restored if needed.
          </Text>
          <Button
            isPending={isPending}
            onPress={() => {
              mutate({ path: { workspace_name: workspaceName } });
            }}
          >
            Archive
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
