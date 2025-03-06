import { MUX_FIELD_NAME } from './schema-mux'

export function getMuxFieldName({
  field,
  index,
}: {
  index: number
  field: (typeof MUX_FIELD_NAME)[keyof typeof MUX_FIELD_NAME]
}) {
  return `${MUX_FIELD_NAME}.${index}.${field}`
}
