import { LinkExternal02 } from '@untitled-ui/icons-react'
// eslint-disable-next-line import/no-restricted-paths
import { Header } from '../features/header/components/header'
import { PageContainer } from './page-container'
import { EmptyState } from './empty-state'
import { IllustrationAlert, LinkButton } from '@stacklok/ui-kit'
import { emptyStateStrings } from '@/constants/empty-state-strings'
import { hrefs } from '@/lib/hrefs'

export function ErrorFallbackContent() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center py-20">
        <EmptyState
          title={emptyStateStrings.title.anErrorOccurred}
          body={emptyStateStrings.body.errorDesc}
          illustration={IllustrationAlert}
          actions={[
            <LinkButton
              key="discord"
              variant="secondary"
              href={hrefs.external.discord}
              rel="noopener noreferrer"
              target="_blank"
            >
              Discord
              <LinkExternal02 />
            </LinkButton>,
            <LinkButton
              key="github-issues"
              variant="secondary"
              href={hrefs.external.github.newIssue}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub issues
              <LinkExternal02 />
            </LinkButton>,
          ]}
        />
      </div>
    </PageContainer>
  )
}

export function Error() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-full shrink-0">
        <Header />
      </div>
      <ErrorFallbackContent />
    </div>
  )
}
