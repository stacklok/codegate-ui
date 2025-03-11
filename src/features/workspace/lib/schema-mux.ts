import { MuxMatcherType } from '@/api/generated'
import { z } from 'zod'

const schemaMuxRow = z.object({
  model: z.string({ message: 'Muxing: Model is required' }),
  matcher_type: z.nativeEnum(MuxMatcherType, {
    message: 'Muxing: Matcher type is required',
  }),
  matcher: z.string({ message: 'Muxing: Matcher cannot be empty' }).nonempty({
    message: 'Muxing: Matcher cannot be empty',
  }),
})

export type FieldValuesMuxRow = z.infer<typeof schemaMuxRow>

export const schemaWorkspaceConfig = z.object({
  muxing_rules: z.array(schemaMuxRow),
})

export type WorkspaceConfigFieldValues = z.infer<typeof schemaWorkspaceConfig>

export const WORKSPACE_CONFIG_FIELD_NAME = schemaWorkspaceConfig.keyof().Enum
export const MUX_FIELD_NAME = schemaMuxRow.keyof().Enum
