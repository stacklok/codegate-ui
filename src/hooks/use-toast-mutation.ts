import { HTTPValidationError } from '@/api/generated'
import { toast } from '@stacklok/ui-kit'
import {
  DefaultError,
  // eslint-disable-next-line no-restricted-imports
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { useCallback } from 'react'

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
  successMsg?: ((variables: TVariables) => string) | string
  loadingMsg?: string
  errorMsg?: string
}) {
  const {
    mutateAsync: originalMutateAsync,
    // NOTE: We are not allowing direct use of the `mutate` (sync) function
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: _,
    ...rest
  } = useMutation(options)

  const mutateAsync = useCallback(
    async <TError extends { detail: string | undefined | HTTPValidationError }>(
      variables: Parameters<typeof originalMutateAsync>[0],
      options: Parameters<typeof originalMutateAsync>[1] = {}
    ) => {
      const promise = originalMutateAsync(variables, options)

      toast.promise(promise, {
        success:
          typeof successMsg === 'function' ? successMsg(variables) : successMsg,
        loading: loadingMsg ?? 'Loading...',
        duration: 5000,
        error: (e: TError) => {
          if (errorMsg) return errorMsg

          if (typeof e.detail == 'string') {
            return e.detail ?? 'An error occurred'
          }

          if (Array.isArray(e.detail)) {
            const err = e.detail
              ?.map((item) => `${item.msg} - ${JSON.stringify(item.loc)}`)
              .filter(Boolean)
              .join(', ')

            return err ?? 'An error occurred'
          }

          return 'An error occurred'
        },
      })
    },
    [errorMsg, loadingMsg, originalMutateAsync, successMsg]
  )

  return { mutateAsync, ...rest }
}
