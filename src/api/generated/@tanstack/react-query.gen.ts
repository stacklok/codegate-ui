// This file is auto-generated by @hey-api/openapi-ts

import type { OptionsLegacyParser } from "@hey-api/client-fetch";
import { queryOptions, type UseMutationOptions } from "@tanstack/react-query";
import {
  client,
  healthCheckHealthGet,
  v1ListProviderEndpoints,
  v1AddProviderEndpoint,
  v1ListAllModelsForAllProviders,
  v1ListModelsByProvider,
  v1GetProviderEndpoint,
  v1UpdateProviderEndpoint,
  v1DeleteProviderEndpoint,
  v1ListWorkspaces,
  v1CreateWorkspace,
  v1ListActiveWorkspaces,
  v1ActivateWorkspace,
  v1DeleteWorkspace,
  v1ListArchivedWorkspaces,
  v1RecoverWorkspace,
  v1HardDeleteWorkspace,
  v1GetWorkspaceAlerts,
  v1GetWorkspaceMessages,
  v1GetWorkspaceCustomInstructions,
  v1SetWorkspaceCustomInstructions,
  v1DeleteWorkspaceCustomInstructions,
  v1GetWorkspaceMuxes,
  v1SetWorkspaceMuxes,
  v1StreamSse,
  v1VersionCheck,
  v1GetWorkspaceTokenUsage,
} from "../sdk.gen";
import type {
  V1ListProviderEndpointsData,
  V1AddProviderEndpointData,
  V1AddProviderEndpointError,
  V1AddProviderEndpointResponse,
  V1ListModelsByProviderData,
  V1GetProviderEndpointData,
  V1UpdateProviderEndpointData,
  V1UpdateProviderEndpointError,
  V1UpdateProviderEndpointResponse,
  V1DeleteProviderEndpointData,
  V1DeleteProviderEndpointError,
  V1DeleteProviderEndpointResponse,
  V1CreateWorkspaceData,
  V1CreateWorkspaceError,
  V1CreateWorkspaceResponse,
  V1ActivateWorkspaceData,
  V1ActivateWorkspaceError,
  V1ActivateWorkspaceResponse,
  V1DeleteWorkspaceData,
  V1DeleteWorkspaceError,
  V1DeleteWorkspaceResponse,
  V1RecoverWorkspaceData,
  V1RecoverWorkspaceError,
  V1RecoverWorkspaceResponse,
  V1HardDeleteWorkspaceData,
  V1HardDeleteWorkspaceError,
  V1HardDeleteWorkspaceResponse,
  V1GetWorkspaceAlertsData,
  V1GetWorkspaceMessagesData,
  V1GetWorkspaceCustomInstructionsData,
  V1SetWorkspaceCustomInstructionsData,
  V1SetWorkspaceCustomInstructionsError,
  V1SetWorkspaceCustomInstructionsResponse,
  V1DeleteWorkspaceCustomInstructionsData,
  V1DeleteWorkspaceCustomInstructionsError,
  V1DeleteWorkspaceCustomInstructionsResponse,
  V1GetWorkspaceMuxesData,
  V1SetWorkspaceMuxesData,
  V1SetWorkspaceMuxesError,
  V1SetWorkspaceMuxesResponse,
  V1GetWorkspaceTokenUsageData,
} from "../types.gen";

type QueryKey<TOptions extends OptionsLegacyParser> = [
  Pick<TOptions, "baseUrl" | "body" | "headers" | "path" | "query"> & {
    _id: string;
    _infinite?: boolean;
  },
];

const createQueryKey = <TOptions extends OptionsLegacyParser>(
  id: string,
  options?: TOptions,
  infinite?: boolean,
): QueryKey<TOptions>[0] => {
  const params: QueryKey<TOptions>[0] = {
    _id: id,
    baseUrl: (options?.client ?? client).getConfig().baseUrl,
  } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return params;
};

export const healthCheckHealthGetQueryKey = (options?: OptionsLegacyParser) => [
  createQueryKey("healthCheckHealthGet", options),
];

export const healthCheckHealthGetOptions = (options?: OptionsLegacyParser) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await healthCheckHealthGet({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: healthCheckHealthGetQueryKey(options),
  });
};

export const v1ListProviderEndpointsQueryKey = (
  options?: OptionsLegacyParser<V1ListProviderEndpointsData>,
) => [createQueryKey("v1ListProviderEndpoints", options)];

export const v1ListProviderEndpointsOptions = (
  options?: OptionsLegacyParser<V1ListProviderEndpointsData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ListProviderEndpoints({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ListProviderEndpointsQueryKey(options),
  });
};

export const v1AddProviderEndpointQueryKey = (
  options: OptionsLegacyParser<V1AddProviderEndpointData>,
) => [createQueryKey("v1AddProviderEndpoint", options)];

export const v1AddProviderEndpointOptions = (
  options: OptionsLegacyParser<V1AddProviderEndpointData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1AddProviderEndpoint({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1AddProviderEndpointQueryKey(options),
  });
};

export const v1AddProviderEndpointMutation = (
  options?: Partial<OptionsLegacyParser<V1AddProviderEndpointData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1AddProviderEndpointResponse,
    V1AddProviderEndpointError,
    OptionsLegacyParser<V1AddProviderEndpointData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1AddProviderEndpoint({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1ListAllModelsForAllProvidersQueryKey = (
  options?: OptionsLegacyParser,
) => [createQueryKey("v1ListAllModelsForAllProviders", options)];

export const v1ListAllModelsForAllProvidersOptions = (
  options?: OptionsLegacyParser,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ListAllModelsForAllProviders({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ListAllModelsForAllProvidersQueryKey(options),
  });
};

export const v1ListModelsByProviderQueryKey = (
  options: OptionsLegacyParser<V1ListModelsByProviderData>,
) => [createQueryKey("v1ListModelsByProvider", options)];

export const v1ListModelsByProviderOptions = (
  options: OptionsLegacyParser<V1ListModelsByProviderData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ListModelsByProvider({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ListModelsByProviderQueryKey(options),
  });
};

export const v1GetProviderEndpointQueryKey = (
  options: OptionsLegacyParser<V1GetProviderEndpointData>,
) => [createQueryKey("v1GetProviderEndpoint", options)];

export const v1GetProviderEndpointOptions = (
  options: OptionsLegacyParser<V1GetProviderEndpointData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1GetProviderEndpoint({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1GetProviderEndpointQueryKey(options),
  });
};

export const v1UpdateProviderEndpointMutation = (
  options?: Partial<OptionsLegacyParser<V1UpdateProviderEndpointData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1UpdateProviderEndpointResponse,
    V1UpdateProviderEndpointError,
    OptionsLegacyParser<V1UpdateProviderEndpointData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1UpdateProviderEndpoint({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1DeleteProviderEndpointMutation = (
  options?: Partial<OptionsLegacyParser<V1DeleteProviderEndpointData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1DeleteProviderEndpointResponse,
    V1DeleteProviderEndpointError,
    OptionsLegacyParser<V1DeleteProviderEndpointData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1DeleteProviderEndpoint({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1ListWorkspacesQueryKey = (options?: OptionsLegacyParser) => [
  createQueryKey("v1ListWorkspaces", options),
];

export const v1ListWorkspacesOptions = (options?: OptionsLegacyParser) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ListWorkspaces({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ListWorkspacesQueryKey(options),
  });
};

export const v1CreateWorkspaceQueryKey = (
  options: OptionsLegacyParser<V1CreateWorkspaceData>,
) => [createQueryKey("v1CreateWorkspace", options)];

export const v1CreateWorkspaceOptions = (
  options: OptionsLegacyParser<V1CreateWorkspaceData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1CreateWorkspace({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1CreateWorkspaceQueryKey(options),
  });
};

export const v1CreateWorkspaceMutation = (
  options?: Partial<OptionsLegacyParser<V1CreateWorkspaceData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1CreateWorkspaceResponse,
    V1CreateWorkspaceError,
    OptionsLegacyParser<V1CreateWorkspaceData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1CreateWorkspace({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1ListActiveWorkspacesQueryKey = (
  options?: OptionsLegacyParser,
) => [createQueryKey("v1ListActiveWorkspaces", options)];

export const v1ListActiveWorkspacesOptions = (
  options?: OptionsLegacyParser,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ListActiveWorkspaces({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ListActiveWorkspacesQueryKey(options),
  });
};

export const v1ActivateWorkspaceQueryKey = (
  options: OptionsLegacyParser<V1ActivateWorkspaceData>,
) => [createQueryKey("v1ActivateWorkspace", options)];

export const v1ActivateWorkspaceOptions = (
  options: OptionsLegacyParser<V1ActivateWorkspaceData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ActivateWorkspace({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ActivateWorkspaceQueryKey(options),
  });
};

export const v1ActivateWorkspaceMutation = (
  options?: Partial<OptionsLegacyParser<V1ActivateWorkspaceData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1ActivateWorkspaceResponse,
    V1ActivateWorkspaceError,
    OptionsLegacyParser<V1ActivateWorkspaceData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1ActivateWorkspace({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1DeleteWorkspaceMutation = (
  options?: Partial<OptionsLegacyParser<V1DeleteWorkspaceData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1DeleteWorkspaceResponse,
    V1DeleteWorkspaceError,
    OptionsLegacyParser<V1DeleteWorkspaceData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1DeleteWorkspace({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1ListArchivedWorkspacesQueryKey = (
  options?: OptionsLegacyParser,
) => [createQueryKey("v1ListArchivedWorkspaces", options)];

export const v1ListArchivedWorkspacesOptions = (
  options?: OptionsLegacyParser,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1ListArchivedWorkspaces({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1ListArchivedWorkspacesQueryKey(options),
  });
};

export const v1RecoverWorkspaceQueryKey = (
  options: OptionsLegacyParser<V1RecoverWorkspaceData>,
) => [createQueryKey("v1RecoverWorkspace", options)];

export const v1RecoverWorkspaceOptions = (
  options: OptionsLegacyParser<V1RecoverWorkspaceData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1RecoverWorkspace({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1RecoverWorkspaceQueryKey(options),
  });
};

export const v1RecoverWorkspaceMutation = (
  options?: Partial<OptionsLegacyParser<V1RecoverWorkspaceData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1RecoverWorkspaceResponse,
    V1RecoverWorkspaceError,
    OptionsLegacyParser<V1RecoverWorkspaceData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1RecoverWorkspace({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1HardDeleteWorkspaceMutation = (
  options?: Partial<OptionsLegacyParser<V1HardDeleteWorkspaceData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1HardDeleteWorkspaceResponse,
    V1HardDeleteWorkspaceError,
    OptionsLegacyParser<V1HardDeleteWorkspaceData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1HardDeleteWorkspace({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1GetWorkspaceAlertsQueryKey = (
  options: OptionsLegacyParser<V1GetWorkspaceAlertsData>,
) => [createQueryKey("v1GetWorkspaceAlerts", options)];

export const v1GetWorkspaceAlertsOptions = (
  options: OptionsLegacyParser<V1GetWorkspaceAlertsData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1GetWorkspaceAlerts({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1GetWorkspaceAlertsQueryKey(options),
  });
};

export const v1GetWorkspaceMessagesQueryKey = (
  options: OptionsLegacyParser<V1GetWorkspaceMessagesData>,
) => [createQueryKey("v1GetWorkspaceMessages", options)];

export const v1GetWorkspaceMessagesOptions = (
  options: OptionsLegacyParser<V1GetWorkspaceMessagesData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1GetWorkspaceMessages({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1GetWorkspaceMessagesQueryKey(options),
  });
};

export const v1GetWorkspaceCustomInstructionsQueryKey = (
  options: OptionsLegacyParser<V1GetWorkspaceCustomInstructionsData>,
) => [createQueryKey("v1GetWorkspaceCustomInstructions", options)];

export const v1GetWorkspaceCustomInstructionsOptions = (
  options: OptionsLegacyParser<V1GetWorkspaceCustomInstructionsData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1GetWorkspaceCustomInstructions({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1GetWorkspaceCustomInstructionsQueryKey(options),
  });
};

export const v1SetWorkspaceCustomInstructionsMutation = (
  options?: Partial<OptionsLegacyParser<V1SetWorkspaceCustomInstructionsData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1SetWorkspaceCustomInstructionsResponse,
    V1SetWorkspaceCustomInstructionsError,
    OptionsLegacyParser<V1SetWorkspaceCustomInstructionsData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1SetWorkspaceCustomInstructions({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1DeleteWorkspaceCustomInstructionsMutation = (
  options?: Partial<
    OptionsLegacyParser<V1DeleteWorkspaceCustomInstructionsData>
  >,
) => {
  const mutationOptions: UseMutationOptions<
    V1DeleteWorkspaceCustomInstructionsResponse,
    V1DeleteWorkspaceCustomInstructionsError,
    OptionsLegacyParser<V1DeleteWorkspaceCustomInstructionsData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1DeleteWorkspaceCustomInstructions({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1GetWorkspaceMuxesQueryKey = (
  options: OptionsLegacyParser<V1GetWorkspaceMuxesData>,
) => [createQueryKey("v1GetWorkspaceMuxes", options)];

export const v1GetWorkspaceMuxesOptions = (
  options: OptionsLegacyParser<V1GetWorkspaceMuxesData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1GetWorkspaceMuxes({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1GetWorkspaceMuxesQueryKey(options),
  });
};

export const v1SetWorkspaceMuxesMutation = (
  options?: Partial<OptionsLegacyParser<V1SetWorkspaceMuxesData>>,
) => {
  const mutationOptions: UseMutationOptions<
    V1SetWorkspaceMuxesResponse,
    V1SetWorkspaceMuxesError,
    OptionsLegacyParser<V1SetWorkspaceMuxesData>
  > = {
    mutationFn: async (localOptions) => {
      const { data } = await v1SetWorkspaceMuxes({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};

export const v1StreamSseQueryKey = (options?: OptionsLegacyParser) => [
  createQueryKey("v1StreamSse", options),
];

export const v1StreamSseOptions = (options?: OptionsLegacyParser) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1StreamSse({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1StreamSseQueryKey(options),
  });
};

export const v1VersionCheckQueryKey = (options?: OptionsLegacyParser) => [
  createQueryKey("v1VersionCheck", options),
];

export const v1VersionCheckOptions = (options?: OptionsLegacyParser) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1VersionCheck({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1VersionCheckQueryKey(options),
  });
};

export const v1GetWorkspaceTokenUsageQueryKey = (
  options: OptionsLegacyParser<V1GetWorkspaceTokenUsageData>,
) => [createQueryKey("v1GetWorkspaceTokenUsage", options)];

export const v1GetWorkspaceTokenUsageOptions = (
  options: OptionsLegacyParser<V1GetWorkspaceTokenUsageData>,
) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await v1GetWorkspaceTokenUsage({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: v1GetWorkspaceTokenUsageQueryKey(options),
  });
};
