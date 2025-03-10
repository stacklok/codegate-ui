import { describe, it, expect } from 'vitest'
import { serializeMuxModel, deserializeMuxModel } from '../mux-model-serde'
import { ModelByProvider } from '@/api/generated'

describe('mux-model serialization/deserialization', () => {
  it.each([
    {
      name: 'deepseek-r1:1.5b',
      //   provider_type: 'ollama',
      provider_name: 'ollama',
      provider_id: 'deepseek-r1',
    },
    {
      name: 'mistral-nemo:latest',
      //   provider_type: 'ollama',
      provider_name: 'ollama_muxing',
      provider_id: 'mistral-nemo',
    },
    {
      name: '01-ai/yi-large',
      //   provider_type: 'openrouter',
      provider_name: 'openrouter_muxing',
      provider_id: '01-ai',
    },
    {
      name: 'anthropic/claude-3-opus:beta',
      //   provider_type: 'openrouter',
      provider_name: 'openrouter_muxing',
      provider_id: 'anthropic',
    },
  ] as ModelByProvider[])(
    'should correctly serialize and deserialize model: $name',
    (model) => {
      const serialized = serializeMuxModel(model)
      const deserialized = deserializeMuxModel(serialized)
      expect(deserialized).toEqual(model)
    }
  )
})
