import { ProviderAuthType, ProviderType } from '@/api/generated'
import { match } from 'ts-pattern'

export const PROVIDER_AUTH_TYPE_MAP = {
  [ProviderAuthType.NONE]: 'None',
  [ProviderAuthType.PASSTHROUGH]: 'Passthrough',
  [ProviderAuthType.API_KEY]: 'API key',
}

export function getAuthTypeOptions() {
  return Object.entries(PROVIDER_AUTH_TYPE_MAP).map(([id, textValue]) => ({
    id,
    textValue,
  }))
}

export function getProviderType() {
  return Object.values(ProviderType).map((textValue) => ({
    id: textValue,
    textValue,
  }))
}

export function isProviderType(value: unknown): value is ProviderType {
  return Object.values(ProviderType).includes(value as ProviderType)
}

export function isProviderAuthType(value: unknown): value is ProviderAuthType {
  return Object.values(ProviderAuthType).includes(value as ProviderAuthType)
}

export function getProviderEndpointByAuthType(provider_type: ProviderType) {
  return match(provider_type)
    .with(ProviderType.OPENAI, () => 'https://api.openai.com')
    .with(ProviderType.ANTHROPIC, () => 'https://api.anthropic.com')
    .with(ProviderType.OPENROUTER, () => 'https://openrouter.ai/api')
    .with(ProviderType.OLLAMA, () => 'http://host.docker.internal:11434')
    .with(ProviderType.LM_STUDIO, () => 'http://host.docker.internal:1234')
    .with(ProviderType.LLAMACPP, () => 'http://host.docker.internal:8080')
    .with(ProviderType.VLLM, () => 'http://host.docker.internal:8000')
    .exhaustive()
}

export function getProviderAuthByType(provider_type: ProviderType) {
  return match(provider_type)
    .with(ProviderType.OPENAI, () => ProviderAuthType.API_KEY)
    .with(ProviderType.ANTHROPIC, () => ProviderAuthType.API_KEY)
    .with(ProviderType.OPENROUTER, () => ProviderAuthType.API_KEY)
    .otherwise(() => ProviderAuthType.NONE)
}
