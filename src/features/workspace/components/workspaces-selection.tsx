import { useListWorkspaces } from "@/features/workspace/hooks/use-list-workspaces";
import {
  Button,
  DialogTrigger,
  Input,
  LinkButton,
  ListBox,
  ListBoxItem,
  Popover,
  SearchField,
  Separator,
} from "@stacklok/ui-kit";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useActiveWorkspaces } from "../hooks/use-active-workspaces";
import { useActivateWorkspace } from "../hooks/use-activate-workspace";

export function WorkspacesSelection() {
  const queryClient = useQueryClient();

  const { data: workspacesResponse } = useListWorkspaces();
  const { data: activeWorkspacesResponse } = useActiveWorkspaces();
  const { mutateAsync: activateWorkspace } = useActivateWorkspace();

  const activeWorkspaceName: string | null =
    activeWorkspacesResponse?.workspaces[0]?.name ?? null;

  const [isOpen, setIsOpen] = useState(false);
  const [searchWorkspace, setSearchWorkspace] = useState("");
  const workspaces = workspacesResponse?.workspaces ?? [];
  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchWorkspace.toLowerCase()),
  );

  const handleWorkspaceClick = (name: string) => {
    activateWorkspace({ body: { name } }).then(() => {
      queryClient.invalidateQueries({ refetchType: "all" });
      setIsOpen(false);
    });
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={(test) => setIsOpen(test)}>
      <Button variant="tertiary" className="flex cursor-pointer">
        Workspace {activeWorkspaceName ?? "default"}
        <ChevronDown />
      </Button>

      <Popover className="w-1/4 p-4" placement="bottom left">
        <div>
          <div>
            <SearchField
              onChange={setSearchWorkspace}
              autoFocus
              aria-label="search"
            >
              <Input icon={<Search />} />
            </SearchField>
          </div>

          <ListBox
            className="pb-2 pt-3"
            aria-label="Workspaces"
            items={filteredWorkspaces}
            selectedKeys={activeWorkspaceName ? [activeWorkspaceName] : []}
            selectionMode="single"
            onSelectionChange={(v) => {
              if (v === "all") return; // Not possible with `selectionMode="single"`
              const [key] = v.keys();
              if (!key) return;
              handleWorkspaceClick(key?.toString());
            }}
            renderEmptyState={() => (
              <p className="text-center">No workspaces found</p>
            )}
          >
            {(item) => (
              <ListBoxItem id={item.name} key={item.name}>
                {item.name}
              </ListBoxItem>
            )}
          </ListBox>
          <Separator className="" />
          <LinkButton
            href="/workspaces"
            onPress={() => setIsOpen(false)}
            variant="tertiary"
            className="text-secondary h-8 pl-2 gap-2 flex mt-2 justify-start"
          >
            <Settings />
            Manage Workspaces
          </LinkButton>
        </div>
      </Popover>
    </DialogTrigger>
  );
}
