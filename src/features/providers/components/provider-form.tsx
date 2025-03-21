import { AddProviderEndpointRequest, ProviderAuthType } from '@/api/generated'
import { Label, Select, SelectButton, Input, TextField } from '@stacklok/ui-kit'
import {
  getAuthTypeOptions,
  getProviderAuthByType,
  getProviderEndpointByAuthType,
  getProviderType,
  isProviderAuthType,
  isProviderType,
} from '../lib/utils'

interface Props {
  provider: AddProviderEndpointRequest
  setProvider: (provider: AddProviderEndpointRequest) => void
}

export function ProviderForm({ provider, setProvider }: Props) {
  const providerAuthType =
    provider.auth_type || getProviderAuthByType(provider.provider_type)

  const handleProviderType = (provider: AddProviderEndpointRequest) => {
    setProvider({
      ...provider,
      auth_type: getProviderAuthByType(provider.provider_type),
      endpoint: getProviderEndpointByAuthType(provider.provider_type),
    })
  }

  return (
    <div className="w-full">
      <div className="">
        <TextField
          aria-label="Provider name"
          name="name"
          validationBehavior="aria"
          isRequired
          onChange={(name) => setProvider({ ...provider, name })}
        >
          <Label>Name</Label>
          <Input value={provider.name} placeholder="Provider name" />
        </TextField>
      </div>
      <div className="py-3">
        <Label id="provider-type">Provider</Label>
        <Select
          aria-labelledby="provider type"
          selectedKey={provider.provider_type}
          name="provider_type"
          isRequired
          className="w-full"
          placeholder="Select the provider type"
          items={getProviderType()}
          onSelectionChange={(provider_type) => {
            if (isProviderType(provider_type)) {
              handleProviderType({
                ...provider,
                provider_type,
              })
            }
          }}
        >
          <SelectButton />
        </Select>
      </div>
      <div className="py-3">
        <TextField
          aria-label="Provider description"
          name="description"
          validationBehavior="aria"
          onChange={(description) => setProvider({ ...provider, description })}
        >
          <Label>Description (optional)</Label>
          <Input
            placeholder="Provider description"
            value={provider.description}
          />
        </TextField>
      </div>
      <div className="py-3">
        <TextField
          aria-label="Provider endpoint"
          name="endpoint"
          validationBehavior="aria"
          isRequired
          onChange={(endpoint) => setProvider({ ...provider, endpoint })}
        >
          <Label>Endpoint</Label>
          <Input placeholder="Provider endpoint" value={provider.endpoint} />
        </TextField>
      </div>
      <div className="py-3">
        <Label id="provider-authentication">Authentication</Label>
        <Select
          aria-labelledby="provider auth type"
          name="auth_type"
          selectedKey={providerAuthType}
          isRequired
          className="w-full"
          placeholder="Select the authentication type"
          items={getAuthTypeOptions()}
          onSelectionChange={(auth_type) => {
            if (isProviderAuthType(auth_type)) {
              setProvider({ ...provider, auth_type })
            }
          }}
        >
          <SelectButton />
        </Select>
      </div>

      {providerAuthType === ProviderAuthType.API_KEY && (
        <div className="pt-4">
          <TextField
            aria-label="Provider API key"
            name="api_key"
            type="password"
            validationBehavior="aria"
            isRequired
            onChange={(api_key) => setProvider({ ...provider, api_key })}
          >
            <Label>API key</Label>
            <Input
              placeholder={
                provider.api_key === undefined
                  ? 'Update the provider API key'
                  : 'Specify the provider API key'
              }
              value={provider.api_key ?? ''}
            />
          </TextField>
        </div>
      )}
    </div>
  )
}
