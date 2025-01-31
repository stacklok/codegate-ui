import {
  DefinedUseQueryResult,
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
  QueryObserverPendingResult,
  QueryObserverRefetchErrorResult,
  useQueries,
} from "@tanstack/react-query";
import {
  v1ListArchivedWorkspacesOptions,
  v1ListWorkspacesOptions,
} from "@/api/generated/@tanstack/react-query.gen";
import {
  V1ListArchivedWorkspacesResponse,
  V1ListWorkspacesResponse,
} from "@/api/generated";

type QueryResult<T> =
  | DefinedUseQueryResult<T, Error>
  | QueryObserverLoadingErrorResult<T, Error>
  | QueryObserverLoadingResult<T, Error>
  | QueryObserverPendingResult<T, Error>
  | QueryObserverRefetchErrorResult<T, Error>;

type UseQueryDataReturn = [
  QueryResult<V1ListWorkspacesResponse>,
  QueryResult<V1ListArchivedWorkspacesResponse>,
];

const combine = (results: UseQueryDataReturn) => {
  const [workspaces, archivedWorkspaces] = results;

  const active = workspaces.data?.workspaces
    ? workspaces.data?.workspaces.map(
        (i) => ({ ...i, id: `workspace-${i.name}`, isArchived: false }),
        [],
      )
    : [];

  const archived = archivedWorkspaces.data?.workspaces
    ? archivedWorkspaces.data?.workspaces.map(
        (i) => ({ ...i, id: `archived-workspace-${i.name}`, isArchived: true }),
        [],
      )
    : [];

  return {
    data: [...active, ...archived],
    isPending: results.some((r) => r.isPending),
    isFetching: results.some((r) => r.isFetching),
    isLoading: results.some((r) => r.isLoading),
    isRefetching: results.some((r) => r.isRefetching),
  };
};

export const useListAllWorkspaces = () => {
  return useQueries({
    combine,
    queries: [
      {
        ...v1ListWorkspacesOptions(),
      },
      {
        ...v1ListArchivedWorkspacesOptions(),
      },
    ],
  });
};
