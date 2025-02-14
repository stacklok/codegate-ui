import { ProviderDialog } from '@/features/providers/components/provider-dialog'
import { ProviderDialogFooter } from '@/features/providers/components/provider-dialog-footer'
import { ProviderForm } from '@/features/providers/components/provider-form'
import { useMutationUpdateProvider } from '@/features/providers/hooks/use-mutation-update-provider'
import { useProvider } from '@/features/providers/hooks/use-provider'
import { DialogContent, Form } from '@stacklok/ui-kit'
import { useParams } from 'react-router-dom'

export function RouteProviderUpdate() {
  const { id } = useParams()
  if (id === undefined) {
    throw new Error('Provider id is required')
  }
  const { setProvider, provider } = useProvider(id)
  const { mutateAsync } = useMutationUpdateProvider()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutateAsync(provider)
  }

  // TODO add empty state and loading in a next step
  if (provider === undefined) return

  return (
    <ProviderDialog title="Manage Provider">
      <Form
        onSubmit={handleSubmit}
        validationBehavior="aria"
        className="overflow-auto"
      >
        <DialogContent className="p-8">
          <ProviderForm provider={provider} setProvider={setProvider} />
        </DialogContent>
        <ProviderDialogFooter />
      </Form>
    </ProviderDialog>
  )
}
