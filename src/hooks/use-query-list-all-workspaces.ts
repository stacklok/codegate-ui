import { useQueries } from "@tanstack/react-query";
import {
  v1ListArchivedWorkspacesOptions,
  v1ListWorkspacesOptions,
} from "@/api/generated/@tanstack/react-query.gen";
import {
  V1ListArchivedWorkspacesResponse,
  V1ListWorkspacesResponse,
} from "@/api/generated";
import { QueryResult } from "@/types/react-query";

type UseQueryReturn = [
  QueryResult<V1ListWorkspacesResponse>,
  QueryResult<V1ListArchivedWorkspacesResponse>,
];

const combine = (results: UseQueryReturn) => {
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
