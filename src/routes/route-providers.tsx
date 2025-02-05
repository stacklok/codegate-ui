import { BreadcrumbHome } from "@/components/BreadcrumbHome";
import {
  Breadcrumbs,
  Breadcrumb,
  Heading,
  Card,
  LinkButton,
  CardBody,
} from "@stacklok/ui-kit";
import { twMerge } from "tailwind-merge";
import { PlusSquare } from "@untitled-ui/icons-react";
import { TableProviders } from "@/features/providers/components/table-providers";
import { Outlet } from "react-router-dom";

export function RouteProvider({ className }: { className?: string }) {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Providers</Breadcrumb>
      </Breadcrumbs>
      <Heading level={4} className="mb-4 flex items-center justify-between">
        Providers
        <LinkButton className="w-fit" href="/providers/new">
          <PlusSquare /> Add Provider
        </LinkButton>
      </Heading>
      <Card className={twMerge(className, "shrink-0")}>
        <CardBody>
          <TableProviders />
        </CardBody>
      </Card>

      <Outlet />
    </>
  );
}
