import {
  AddProviderEndpointRequest,
  ProviderAuthType,
  ProviderType,
} from '@/api/generated'
import { ProviderDialog } from '@/features/providers/components/provider-dialog'
import { ProviderDialogFooter } from '@/features/providers/components/provider-dialog-footer'
import { ProviderForm } from '@/features/providers/components/provider-form'
import { useMutationCreateProvider } from '@/features/providers/hooks/use-mutation-create-provider'
import { getProviderEndpointByAuthType } from '@/features/providers/lib/utils'
import { DialogContent, Form } from '@stacklok/ui-kit'
import { useState } from 'react'

const DEFAULT_PROVIDER_STATE = {
  name: '',
  description: '',
  auth_type: ProviderAuthType.API_KEY,
  provider_type: ProviderType.OPENAI,
  endpoint: '',
  api_key: '',
}

export function RouteProviderCreate() {
  const [provider, setProvider] = useState<AddProviderEndpointRequest>({
    ...DEFAULT_PROVIDER_STATE,
    endpoint: getProviderEndpointByAuthType(
      DEFAULT_PROVIDER_STATE.provider_type
    ),
  })

  const { mutateAsync } = useMutationCreateProvider()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutateAsync({
      body: provider,
    })
  }

  return (
    <ProviderDialog title="Add provider">
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
