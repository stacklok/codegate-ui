import { useWorkspacesData } from "@/hooks/useWorkspacesData";
import {
  Button,
  DialogTrigger,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  SearchField,
  Separator,
} from "@stacklok/ui-kit";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { ChevronDown, Search, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function WorkspacesSelection() {
  const queryClient = useQueryClient();
  const { data } = useWorkspacesData();
  const [isOpen, setIsOpen] = useState(false);
  const [searchWorkspace, setSearchWorkspace] = useState("");
  const workspaces = data?.workspaces ?? [];
  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchWorkspace.toLowerCase()),
  );
  const activeWorkspace = workspaces.find((workspace) => workspace.is_active);

  const handleWorkspaceClick = () => {
    queryClient.invalidateQueries({ refetchType: "all" });
    setIsOpen(false);
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={(test) => setIsOpen(test)}>
      <Button variant="tertiary" className="flex cursor-pointer">
        Workspace {activeWorkspace?.name ?? "default"}
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
            selectedKeys={activeWorkspace?.name ?? []}
            renderEmptyState={() => (
              <p className="text-center">No workspaces found</p>
            )}
          >
            {(item) => (
              <ListBoxItem
                id={item.name}
                onAction={() => handleWorkspaceClick()}
                className={clsx(
                  "cursor-pointer py-2 m-1 text-base hover:bg-gray-300",
                  {
                    "bg-gray-900 text-white hover:text-secondary":
                      item.is_active,
                  },
                )}
                key={item.name}
              >
                {item.name}
              </ListBoxItem>
            )}
          </ListBox>
          <Separator className="" />
          <Link
            to="/workspaces"
            onClick={() => setIsOpen(false)}
            className="text-secondary pt-3 px-2 gap-2 flex"
          >
            <Settings />
            Manage Workspaces
          </Link>
        </div>
      </Popover>
    </DialogTrigger>
  );
}
