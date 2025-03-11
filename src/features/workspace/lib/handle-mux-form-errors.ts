import { SubmitErrorHandler } from 'react-hook-form'
import { WorkspaceConfigFieldValues } from './schema-mux'
import { toast } from '@stacklok/ui-kit'

export const handleMuxFormErrors: SubmitErrorHandler<
  WorkspaceConfigFieldValues
> = (errors) => {
  if (!Array.isArray(errors.muxing_rules) || errors.muxing_rules[0] == null)
    return

  Object.entries(errors.muxing_rules[0]).forEach((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { message }] = error as [string, { message: string }]
    toast.error(message)
  })
}
