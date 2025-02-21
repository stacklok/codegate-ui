import { BreadcrumbHome } from '@/components/BreadcrumbHome'
import {
  Breadcrumbs,
  Breadcrumb,
  Card,
  LinkButton,
  CardBody,
} from '@stacklok/ui-kit'
import { twMerge } from 'tailwind-merge'
import { PlusSquare } from '@untitled-ui/icons-react'
import { TableProviders } from '@/features/providers/components/table-providers'
import { Outlet } from 'react-router-dom'
import { PageContainer } from '@/components/page-container'
import { PageHeading } from '@/components/heading'

export function RouteProvider({ className }: { className?: string }) {
  return (
    <PageContainer>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb>Providers</Breadcrumb>
      </Breadcrumbs>
      <PageHeading level={4} title="Providers">
        <LinkButton className="w-fit" href="/providers/new">
          <PlusSquare /> Add provider
        </LinkButton>
      </PageHeading>
      <Card className={twMerge(className, 'shrink-0')}>
        <CardBody className="p-0">
          <TableProviders />
        </CardBody>
      </Card>

      <Outlet />
    </PageContainer>
  )
}
