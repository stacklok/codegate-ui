import { MuxFieldName, WorkspaceConfigFieldName } from './schema-mux'

export function getMuxFieldName({
  field,
  index,
}: {
  index: number
  field: (typeof MuxFieldName)[keyof typeof MuxFieldName]
}): string {
  return `${WorkspaceConfigFieldName.muxing_rules}.${index}.${field}` as const
}
