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
import { PageContainer } from "@/components/page-container";

export function RouteProvider({ className }: { className?: string }) {
  return (
    <PageContainer>
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
        <CardBody className="p-0">
          <TableProviders />
        </CardBody>
      </Card>

      <Outlet />
    </PageContainer>
  );
}
