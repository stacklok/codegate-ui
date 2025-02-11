import { useQueryListWorkspaces } from "@/hooks/use-query-list-workspaces";
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
import { useState } from "react";
import { useMutationActivateWorkspace } from "../../../hooks/use-mutation-activate-workspace";
import clsx from "clsx";
import { useQueryActiveWorkspaceName } from "../../../hooks/use-query-active-workspace-name";
import { hrefs } from "@/lib/hrefs";
import { twMerge } from "tailwind-merge";
import ChevronDown from "@untitled-ui/icons-react/build/cjs/ChevronDown";
import { SearchMd, Settings01 } from "@untitled-ui/icons-react";

export function HeaderActiveWorkspaceSelector() {
  const queryClient = useQueryClient();

  const { data: workspacesResponse } = useQueryListWorkspaces();
  const { mutateAsync: activateWorkspace } = useMutationActivateWorkspace();

  const { data: activeWorkspaceName } = useQueryActiveWorkspaceName();

  const [isOpen, setIsOpen] = useState(false);
  const [searchWorkspace, setSearchWorkspace] = useState("");
  const workspaces = workspacesResponse?.workspaces ?? [];
  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchWorkspace.toLowerCase()),
  );

  const handleWorkspaceClick = (name: string) => {
    activateWorkspace({ body: { name } }).then(() => {
      // eslint-disable-next-line no-restricted-syntax
      queryClient.invalidateQueries({ refetchType: "all" }); // Global setting, refetch **everything**
      setIsOpen(false);
    });
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={(test) => setIsOpen(test)}>
      <Button variant="tertiary" className="flex cursor-pointer">
        Active workspace{" "}
        <span className="font-bold">{activeWorkspaceName ?? "default"}</span>
        <ChevronDown />
      </Button>

      <Popover className="w-[32rem] p-3" placement="bottom left">
        <div>
          <div>
            <SearchField
              onChange={setSearchWorkspace}
              autoFocus
              aria-label="search"
            >
              <Input icon={<SearchMd />} />
            </SearchField>
          </div>

          <ListBox
            aria-label="Workspaces"
            items={filteredWorkspaces}
            selectedKeys={activeWorkspaceName ? [activeWorkspaceName] : []}
            onAction={(v) => {
              handleWorkspaceClick(v?.toString());
            }}
            className="-mx-1 my-2 max-h-80 overflow-auto"
            renderEmptyState={() => (
              <p className="text-center">No workspaces found</p>
            )}
          >
            {(item) => (
              <ListBoxItem
                id={item.name}
                key={item.name}
                textValue={item.name}
                data-is-selected={item.name === activeWorkspaceName}
                className={clsx(
                  "grid grid-cols-[auto_1.5rem] group/selector cursor-pointer py-2 m-1 text-base hover:bg-gray-200 rounded-sm",
                  {
                    "!bg-gray-900 hover:bg-gray-900 !text-gray-25 hover:!text-gray-25":
                      item.is_active,
                  },
                )}
              >
                <span className="block truncate">{item.name}</span>

                <LinkButton
                  href={hrefs.workspaces.edit(item.name)}
                  onPress={() => setIsOpen(false)}
                  isIcon
                  variant="tertiary"
                  className={twMerge(
                    "ml-auto size-6 group-hover/selector:opacity-100 opacity-0 transition-opacity",
                    item.is_active
                      ? "hover:bg-gray-800 pressed:bg-gray-700"
                      : "hover:bg-gray-50 hover:text-primary",
                  )}
                >
                  <Settings01
                    className={twMerge(
                      item.is_active ? "text-gray-25" : "text-secondary",
                    )}
                  />
                </LinkButton>
              </ListBoxItem>
            )}
          </ListBox>
          <Separator className="" />
          <LinkButton
            href="/workspaces"
            onPress={() => setIsOpen(false)}
            variant="tertiary"
            className="text-secondary h-10 pl-2 gap-2 flex mt-2 justify-start"
          >
            <Settings01 />
            Manage Workspaces
          </LinkButton>
        </div>
      </Popover>
    </DialogTrigger>
  );
}
