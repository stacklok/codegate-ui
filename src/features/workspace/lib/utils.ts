import { MuxMatcherType } from '@/api/generated'
import { capitalize } from 'lodash'
import { z } from 'zod'

export function getRequestType() {
  return Object.values(MuxMatcherType).map((textValue) => ({
    id: textValue,
    textValue:
      textValue === MuxMatcherType.CATCH_ALL
        ? 'All types'
        : capitalize(textValue),
  }))
}

export function isRequestType(value: unknown): value is MuxMatcherType {
  return Object.values(MuxMatcherType).includes(value as MuxMatcherType)
}

const schema = z.object({
  requestType: z.enum(['catch_all', 'fim', 'chat']),
})

export const MUXING_FIELDS = schema.keyof().Enum
