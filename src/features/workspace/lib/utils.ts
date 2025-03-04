import { MuxMatcherType } from '@/api/generated'

export const MUX_MATCHER_TYPE_MAP = {
  [MuxMatcherType.CHAT_FILENAME]: 'Chat',
  [MuxMatcherType.FIM_FILENAME]: 'FIM',
  [MuxMatcherType.FILENAME_MATCH]: 'FIM & Chat',
  [MuxMatcherType.CATCH_ALL]: 'All types',
}

export function getRequestType() {
  return Object.values(MuxMatcherType)
    .filter((item) => item !== MuxMatcherType.CATCH_ALL)
    .map((textValue) => ({
      id: textValue,
      textValue: MUX_MATCHER_TYPE_MAP[textValue],
    }))
}

export function isRequestType(value: unknown): value is MuxMatcherType {
  return Object.values(MuxMatcherType).includes(value as MuxMatcherType)
}

const DEFAULT_RULE = {
  placeholder: 'Catch-all',
  selectedKey: MuxMatcherType.CATCH_ALL,
  items: [
    {
      id: MuxMatcherType.CATCH_ALL,
      textValue: MUX_MATCHER_TYPE_MAP[MuxMatcherType.CATCH_ALL],
    },
  ],
}

const CUSTOM_RULE = {
  placeholder: 'e.g. file type, file name',
  selectedKey: '',
  items: getRequestType(),
}

export function getRuleData({
  isDefaultRule,
  matcher_type,
}: {
  isDefaultRule: boolean
  matcher_type: MuxMatcherType
}) {
  return isDefaultRule
    ? DEFAULT_RULE
    : {
        ...CUSTOM_RULE,
        selectedKey: matcher_type,
      }
}
