import { ProviderEndpoint } from "@/api/generated";
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  OptionsSchema,
} from "@stacklok/ui-kit";
import { DotsVertical, Settings04, Trash01 } from "@untitled-ui/icons-react";
import { useMutationDeleteProvider } from "../hooks/use-mutation-delete-provider";
import { useConfirmDeleteProvider } from "../hooks/use-confirm-delete-provider";

const getProviderActions = ({
  provider,
  deleteProvider,
}: {
  provider: ProviderEndpoint;
  deleteProvider: ReturnType<typeof useMutationDeleteProvider>["mutateAsync"];
}): OptionsSchema<"menu">[] => [
  {
    textValue: "Edit",
    icon: <Settings04 />,
    id: "edit",
    href: `/providers/${provider.id}`,
  },
  {
    textValue: "Delete",
    icon: <Trash01 />,
    id: "delete",
    onAction: () =>
      deleteProvider({ path: { provider_id: provider.id as string } }),
  },
];

export function TableActions({ provider }: { provider: ProviderEndpoint }) {
  const deleteProvider = useConfirmDeleteProvider();

  return (
    <MenuTrigger>
      <Button aria-label="Actions" isIcon variant="tertiary">
        <DotsVertical />
      </Button>
      <Popover placement="bottom end">
        <Menu
          items={getProviderActions({
            provider,
            deleteProvider,
          })}
        />
      </Popover>
    </MenuTrigger>
  );
}
