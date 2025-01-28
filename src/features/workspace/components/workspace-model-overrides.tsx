import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Text,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { useMutationModelOverridesWorkspace } from "../hooks/use-mutation-model-overrides-workspace";
import { MuxMatcherType } from "@/api/generated";
import { FormEvent } from "react";
import { Plus } from "@untitled-ui/icons-react";
import { useModelOverridesWorkspace } from "../hooks/use-model-overrides-workspace";
import { OverrideEditor } from "@/components/OverrideEditor";

export function WorkspaceModelOverrides({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const { overrides, addOverride } = useModelOverridesWorkspace();
  const { mutateAsync } = useMutationModelOverridesWorkspace();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutateAsync({
      path: { workspace_name: workspaceName },
      body: overrides.map((item) => ({
        ...item,
        matcher_type: MuxMatcherType.FILE_REGEX,
      })),
    });
  };

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-col justify-start">
            <Text className="text-primary">Model Overrides</Text>
            <Text className="flex items-center text-secondary mb-0 text-balance">
              Route to different large language models based on file type,
              individual files, or repository.
            </Text>
          </div>
          <OverrideEditor />
        </CardBody>
        <CardFooter className="justify-between">
          <Button className="w-fit" variant="tertiary" onPress={addOverride}>
            <Plus /> Additional Filter
          </Button>
          <Button
            variant="secondary"
            isDisabled={isArchived || workspaceName === ""}
            type="submit"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
