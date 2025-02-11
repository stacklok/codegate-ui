import { PageHeading } from "@/components/heading";
import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import {
  Breadcrumb,
  Breadcrumbs,
  Kbd,
  LinkButton,
  Tooltip,
  TooltipTrigger,
} from "@stacklok/ui-kit";
import { TableWorkspaces } from "@/features/workspace/components/table-workspaces";
import { useKbdShortcuts } from "@/hooks/use-kbd-shortcuts";
import { useNavigate } from "react-router-dom";
import { hrefs } from "@/lib/hrefs";
import { PlusSquare } from "@untitled-ui/icons-react";
import { PageContainer } from "@/components/page-container";

export function RouteWorkspaces() {
  const navigate = useNavigate();

  useKbdShortcuts([["c", () => navigate(hrefs.workspaces.create)]]);

  return (
    <PageContainer>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Manage Workspaces</Breadcrumb>
      </Breadcrumbs>

      <PageHeading level={1} title="Manage Workspaces">
        <TooltipTrigger delay={0}>
          <LinkButton href={hrefs.workspaces.create} className="w-fit gap-2">
            <PlusSquare /> Create
          </LinkButton>
          <Tooltip className="flex gap-2 items-center">
            <span className="block">Create a new workspace</span>
            <Kbd>C</Kbd>
          </Tooltip>
        </TooltipTrigger>
      </PageHeading>

      <TableWorkspaces />
    </PageContainer>
  );
}
