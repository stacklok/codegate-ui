import { ModelByProvider } from '@/api/generated'

export function serializeMuxModel(model: ModelByProvider): string {
  return `${model.provider_id}___${model.name}`
  //   return `${model.provider_name}___${model.name}`
}

export function deserializeMuxModel(str: string): ModelByProvider {
  const [provider_id, name] = str.split('___')
  if (!provider_id || !name) throw new Error('Invalid model')
  return {
    // provider_type: z.nativeEnum(ProviderType).parse(provider_type),
    provider_id,
    // @ts-expect-error - the API is not returning this right now, this will
    // change soon anyway
    provider_name: null,
    name,
  }
}
