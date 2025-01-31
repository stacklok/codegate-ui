import { JSX, ReactNode, SVGProps } from "react";
import {
  AlertsFilterView,
  useAlertsFilterSearchParams,
} from "./use-alerts-filter-search-params";
import { match, P } from "ts-pattern";
import {
  IllustrationDone,
  IllustrationDragAndDrop,
  IllustrationAlert,
  IllustrationNoSearchResults,
  Loader,
  LinkButton,
  Button,
} from "@stacklok/ui-kit";
import { emptyStateStrings } from "../constants/strings";
import { useQueryGetWorkspaceAlerts } from "./use-query-get-workspace-alerts";
import { useListAllWorkspaces } from "@/features/workspace/hooks/use-query-list-all-workspaces";
import { twMerge } from "tailwind-merge";
import { hrefs } from "@/lib/hrefs";
import { LinkExternal02 } from "@untitled-ui/icons-react";

type Input = {
  isLoading: boolean;
  hasWorkspaceAlerts: boolean;
  hasMultipleWorkspaces: boolean;
  search: string | null;
  view: AlertsFilterView | null;
};

type Output = {
  illustration: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  body: string;
  actions: [ReactNode, ReactNode?] | null;
};

export function useAlertsEmptyState(controlledIsLoading: boolean) {
  const { state, setSearch } = useAlertsFilterSearchParams();

  const { data: alerts = [], isLoading: isAlertsLoading } =
    useQueryGetWorkspaceAlerts();

  const { data: workspaces = [], isLoading: isWorkspacesLoading } =
    useListAllWorkspaces();

  const isLoading =
    controlledIsLoading || isAlertsLoading || isWorkspacesLoading;

  return match<Input, Output>({
    isLoading,
    hasWorkspaceAlerts: alerts.length > 0,
    hasMultipleWorkspaces:
      workspaces.filter((w) => w.name !== "default").length > 0,
    search: state.search || null,
    view: state.view,
  })
    .with(
      {
        isLoading: true,
        hasWorkspaceAlerts: P._,
        hasMultipleWorkspaces: P._,
        search: P._,
        view: P._,
      },
      () => ({
        title: emptyStateStrings.title.loading,
        body: emptyStateStrings.body.loading,
        actions: null,
        illustration: (props) => (
          <Loader
            {...props}
            className={twMerge(props.className, "[&>path]:stroke-[0.1px]")}
          />
        ),
      }),
    )
    .with(
      {
        hasWorkspaceAlerts: false,
        hasMultipleWorkspaces: false,
        search: P._,
        view: P._,
      },
      () => ({
        title: emptyStateStrings.title.getStarted,
        body: emptyStateStrings.body.getStartedDesc,
        actions: [
          <LinkButton
            aria-label="CodeGate docs"
            key="codegate-docs"
            href={hrefs.external.docs}
            target="_blank"
          >
            CodeGate docs
            <LinkExternal02 />
          </LinkButton>,
        ],
        illustration: IllustrationDragAndDrop,
      }),
    )
    .with(
      {
        hasWorkspaceAlerts: true,
        hasMultipleWorkspaces: P.any,
        search: P.string.select(),
        view: P._,
      },
      (search) => ({
        title: emptyStateStrings.title.noSearchResultsFor(search),
        body: emptyStateStrings.body.tryChangingSearch,
        actions: [
          <Button key="clear-search" onPress={() => setSearch(null)}>
            Clear search
          </Button>,
        ],
        illustration: IllustrationNoSearchResults,
      }),
    )
    .with(
      {
        hasWorkspaceAlerts: false,
        hasMultipleWorkspaces: true,
        search: P._,
        view: P.any,
      },
      () => ({
        title: emptyStateStrings.title.noAlertsFoundWorkspace,
        body: emptyStateStrings.body.alertsWillShowUpWhenWorkspace,
        actions: [
          <LinkButton key="manage-workspaces" href={hrefs.workspaces.all}>
            Manage workspaces
          </LinkButton>,
        ],
        illustration: IllustrationDone,
      }),
    )
    .with(
      {
        hasWorkspaceAlerts: true,
        hasMultipleWorkspaces: true,
        search: P._,
        view: AlertsFilterView.MALICIOUS,
      },
      () => ({
        title: emptyStateStrings.title.noMaliciousPackagesDetected,
        body: emptyStateStrings.body.maliciousDesc,
        actions: null,
        illustration: IllustrationDone,
      }),
    )
    .with(
      {
        hasWorkspaceAlerts: true,
        hasMultipleWorkspaces: P.any,
        view: AlertsFilterView.SECRETS,
      },
      () => ({
        title: emptyStateStrings.title.noLeakedSecretsDetected,
        body: emptyStateStrings.body.secretsDesc,
        actions: null,
        illustration: IllustrationDone,
      }),
    )
    .otherwise(() => ({
      title: "An error occurred",
      body: "Please try refreshing the page. If this issue persists, please let us know on Discord, or open a a new Github Issue",
      illustration: IllustrationAlert,
      actions: [
        <LinkButton
          key="discord"
          variant="secondary"
          href="https://discord.gg/stacklok"
          rel="noopener noreferrer"
          target="_blank"
        >
          Discord
        </LinkButton>,
        <LinkButton
          key="github-issues"
          variant="secondary"
          href="https://github.com/stacklok/codegate/issues/new"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github issues
        </LinkButton>,
      ],
    }));
}
