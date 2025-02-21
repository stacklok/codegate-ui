import { BreadcrumbHome } from '@/components/BreadcrumbHome'
import { PageContainer } from '@/components/page-container'
import { WorkspaceCreation } from '@/features/workspace/components/workspace-creation'
import { PageHeading } from '@/components/heading'
import { Breadcrumbs, Breadcrumb } from '@stacklok/ui-kit'

export function RouteWorkspaceCreation() {
  return (
    <PageContainer>
      <Breadcrumbs>
        <BreadcrumbHome />
        <Breadcrumb href="/workspaces">Manage workspaces</Breadcrumb>
        <Breadcrumb>Create workspace</Breadcrumb>
      </Breadcrumbs>

      <PageHeading level={1} title="Create workspace" />
      <WorkspaceCreation />
    </PageContainer>
  )
}
