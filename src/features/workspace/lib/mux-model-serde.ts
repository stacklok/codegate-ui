import { ModelByProvider, ProviderType } from '@/api/generated'
import { z } from 'zod'

export function serializeMuxModel(model: ModelByProvider): string {
  return `${model.provider_name}___${model.provider_type}___${model.name}`
}

export function deserializeMuxModel(str: string): ModelByProvider {
  const [provider_name, provider_type, name] = str.split('___')
  if (!provider_name || !provider_type || !name)
    throw new Error('Invalid model')
  return {
    provider_name,
    provider_type: z.nativeEnum(ProviderType).parse(provider_type),
    name,
  }
}
