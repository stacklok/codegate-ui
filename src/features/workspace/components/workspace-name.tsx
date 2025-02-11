import { useMutationCreateWorkspace } from "../hooks/use-mutation-create-workspace";
import { useNavigate } from "react-router-dom";
import { Static, Type } from "@sinclair/typebox";
import { FormCard } from "@/forms/FormCard";

const schema = Type.Object({
  workspaceName: Type.String({
    title: "Workspace name",
    minLength: 1,
  }),
});

export function WorkspaceName({
  className,
  workspaceName,
  isArchived,
}: {
  className?: string;
  workspaceName: string;
  isArchived: boolean | undefined;
}) {
  const navigate = useNavigate();
  const { mutateAsync, isPending, error } = useMutationCreateWorkspace();
  const errorMsg = error?.detail ? `${error?.detail}` : "";

  const initialData = { workspaceName };

  const handleSubmit = (data: Static<typeof schema>) => {
    mutateAsync(
      { body: { name: workspaceName, rename_to: data.workspaceName } },
      {
        onSuccess: () => navigate(`/workspace/${data.workspaceName}`),
      },
    );
  };

  return (
    <FormCard
      data-testid="workspace-name"
      className={className}
      formError={errorMsg}
      schema={schema}
      isDisabled={isArchived}
      isPending={isPending}
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
