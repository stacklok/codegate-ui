import { toast } from "@stacklok/ui-kit";
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useCallback } from "react";

export function useToastMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const {
    mutateAsync: originalMutateAsync,
    // NOTE: We are not allowing direct use of the `mutate` (sync) function.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: _,
    ...rest
  } = useMutation(options);

  const mutateAsync = useCallback(
    <TError extends { detail: string | undefined }>(
      variables: Parameters<typeof originalMutateAsync>[0],
      options: Parameters<typeof originalMutateAsync>[1],
      { successMsg }: { successMsg: string },
    ) => {
      const promise = originalMutateAsync(variables, options);

      toast.promise(promise, {
        success: successMsg,
        error: (e: TError) => (e.detail ? e.detail : "An error occurred"),
      });
    },
    [originalMutateAsync],
  );

  return { mutateAsync, ...rest };
}
