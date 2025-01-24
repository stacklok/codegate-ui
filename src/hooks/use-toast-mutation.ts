import { toast } from "@stacklok/ui-kit";
import {
  DefaultError,
  // eslint-disable-next-line no-restricted-imports
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useCallback } from "react";

export function useToastMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>({
  successMsg,
  errorMsg,
  loadingMsg,
  ...options
}: UseMutationOptions<TData, TError, TVariables, TContext> & {
  successMsg?: ((variables: TVariables) => string) | string;
  loadingMsg?: string;
  errorMsg?: string;
}) {
  const {
    mutateAsync: originalMutateAsync,
    // NOTE: We are not allowing direct use of the `mutate` (sync) function
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: _,
    ...rest
  } = useMutation(options);

  const mutateAsync = useCallback(
    async <TError extends { detail: string | undefined }>(
      variables: Parameters<typeof originalMutateAsync>[0],
      options: Parameters<typeof originalMutateAsync>[1] = {},
    ) => {
      const promise = originalMutateAsync(variables, options);

      toast.promise(promise, {
        success:
          typeof successMsg === "function" ? successMsg(variables) : successMsg,
        loading: loadingMsg ?? "Loading...",
        error: (e: TError) =>
          errorMsg ?? (e.detail ? e.detail : "An error occurred"),
      });
    },
    [errorMsg, loadingMsg, originalMutateAsync, successMsg],
  );

  return { mutateAsync, ...rest };
}
