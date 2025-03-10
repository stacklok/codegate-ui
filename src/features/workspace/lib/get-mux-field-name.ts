import { MUX_FIELD_NAME, WORKSPACE_CONFIG_FIELD_NAME } from './schema-mux'

export function getMuxFieldName({
  field,
  index,
}: {
  index: number
  field: (typeof MUX_FIELD_NAME)[keyof typeof MUX_FIELD_NAME]
}): string {
  return `${WORKSPACE_CONFIG_FIELD_NAME.muxing_rules}.${index}.${field}` as const
}
