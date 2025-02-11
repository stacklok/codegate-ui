import {
  Button,
  IllustrationAlert,
  IllustrationDone,
  IllustrationDragAndDrop,
  IllustrationNoSearchResults,
  LinkButton,
  Loader,
} from "@stacklok/ui-kit";
import { ReactNode } from "react";

import { emptyStateStrings } from "../constants/strings";
import { EmptyState } from "@/components/empty-state";
import { hrefs } from "@/lib/hrefs";
import { LinkExternal02 } from "@untitled-ui/icons-react";
import { useListAllWorkspaces } from "@/hooks/use-query-list-all-workspaces";
import {
  AlertsFilterView,
  useMessagesFilterSearchParams,
} from "../hooks/use-messages-filter-search-params";
import { match, P } from "ts-pattern";
import { useQueryGetWorkspaceMessages } from "@/hooks/use-query-get-workspace-messages";
import { twMerge } from "tailwind-merge";

function EmptyStateLoading() {
  return (
    <EmptyState
      title={emptyStateStrings.title.loading}
      body={emptyStateStrings.body.loading}
      illustration={(props) => (
        <Loader {...props} className={twMerge(props.className, "!size-16")} />
      )}
      actions={null}
    />
  );
}

function EmptyStateGetStarted() {
  return (
    <EmptyState
      title={emptyStateStrings.title.getStarted}
      body={emptyStateStrings.body.getStartedDesc}
      illustration={IllustrationDragAndDrop}
      actions={[
        <LinkButton
          aria-label="CodeGate docs"
          key="codegate-docs"
          href={hrefs.external.docs.home}
          target="_blank"
        >
          CodeGate docs
          <LinkExternal02 />
        </LinkButton>,
      ]}
    />
  );
}

function EmptyStateSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string | null) => void;
}) {
  return (
    <EmptyState
      illustration={IllustrationNoSearchResults}
      title={emptyStateStrings.title.noSearchResultsFor(search)}
      body={emptyStateStrings.body.tryChangingSearch}
      actions={[
        <Button key="clear-search" onPress={() => setSearch(null)}>
          Clear search
        </Button>,
      ]}
    />
  );
}

function EmptyStateNoMessagesInWorkspace() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noMessagesWorkspace}
      body={emptyStateStrings.body.messagesWillShowUpWhenWorkspace}
      illustration={IllustrationDone}
      actions={[
        <LinkButton
          key="learn-about-workspaces"
          href={hrefs.external.docs.workspaces}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn about Workspaces
          <LinkExternal02 />
        </LinkButton>,
      ]}
    />
  );
}

function EmptyStateMalicious() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noMaliciousPackagesDetected}
      body={emptyStateStrings.body.maliciousDesc}
      illustration={IllustrationDone}
      actions={null}
    />
  );
}

function EmptyStateSecrets() {
  return (
    <EmptyState
      title={emptyStateStrings.title.noLeakedSecretsDetected}
      body={emptyStateStrings.body.secretsDesc}
      illustration={IllustrationDone}
      actions={null}
    />
  );
}

export function EmptyStateError() {
  return (
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
          Github issues
          <LinkExternal02 />
        </LinkButton>,
      ]}
    />
  );
}

type MatchInput = {
  isLoading: boolean;
  hasWorkspaceMessages: boolean;
  hasMultipleWorkspaces: boolean;
  search: string | null;
  view: AlertsFilterView | null;
};

export function TableAlertsEmptyState() {
  const { state, setSearch } = useMessagesFilterSearchParams();

  const { data: messages = [], isLoading: isMessagesLoading } =
    useQueryGetWorkspaceMessages();

  const { data: workspaces = [], isLoading: isWorkspacesLoading } =
    useListAllWorkspaces();

  const isLoading = isMessagesLoading || isWorkspacesLoading;

  return match<MatchInput, ReactNode>({
    isLoading,
    hasWorkspaceMessages: messages.length > 0,
    hasMultipleWorkspaces:
      workspaces.filter((w) => w.name !== "default").length > 0,
    search: state.search || null,
    view: state.view,
  })
    .with(
      {
        hasMultipleWorkspaces: false,
        hasWorkspaceMessages: false,
        isLoading: false,
        search: P.any,
        view: P.any,
      },
      () => <EmptyStateGetStarted />,
    )
    .with(
      {
        hasMultipleWorkspaces: P.any,
        hasWorkspaceMessages: true,
        isLoading: false,
        search: P.string.select(),
        view: P.any,
      },
      (search) => <EmptyStateSearch search={search} setSearch={setSearch} />,
    )
    .with(
      {
        hasMultipleWorkspaces: true,
        hasWorkspaceMessages: false,
        isLoading: false,
        search: P.any,
        view: AlertsFilterView.ALL,
      },
      () => <EmptyStateNoMessagesInWorkspace />,
    )
    .with(
      {
        hasMultipleWorkspaces: P.any,
        hasWorkspaceMessages: true,
        isLoading: false,
        search: P.any,
        view: AlertsFilterView.MALICIOUS,
      },
      () => <EmptyStateMalicious />,
    )
    .with(
      {
        hasWorkspaceMessages: true,
        hasMultipleWorkspaces: P.any,
        view: AlertsFilterView.SECRETS,
      },
      () => <EmptyStateSecrets />,
    )
    .otherwise(() => <EmptyStateLoading />);
}
