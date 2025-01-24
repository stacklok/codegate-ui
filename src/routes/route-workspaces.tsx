import { WorkspaceHeading } from "@/features/workspace/components/workspace-heading";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import {
  Breadcrumb,
  Breadcrumbs,
  Kbd,
  LinkButton,
  Tooltip,
  TooltipTrigger,
} from "@stacklok/ui-kit";
import { SquarePlus } from "lucide-react";
import { TableWorkspaces } from "@/features/workspace/components/table-workspaces";
import { useKbdShortcuts } from "@/hooks/use-kbd-shortcuts";
import { useNavigate } from "react-router-dom";
import { hrefs } from "@/lib/hrefs";

export function RouteWorkspaces() {
  const navigate = useNavigate();

  useKbdShortcuts([["c", () => navigate(hrefs.workspaces.create)]]);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Manage Workspaces</Breadcrumb>
      </Breadcrumbs>

      <WorkspaceHeading title="Manage Workspaces">
        <TooltipTrigger delay={0}>
          <LinkButton href={hrefs.workspaces.create} className="w-fit gap-2">
            <SquarePlus /> Create
          </LinkButton>
          <Tooltip className="flex gap-2 items-center">
            <span className="block">Create a new workspace</span>
            <Kbd>C</Kbd>
          </Tooltip>
        </TooltipTrigger>
      </WorkspaceHeading>

      <TableWorkspaces />
    </>
  );
}
