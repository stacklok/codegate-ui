import { MuxMatcherType } from '@/api/generated'
import { z } from 'zod'

const schemaMuxCatchAllId = z.literal(MuxMatcherType.CATCH_ALL)

export type MuxCatchallId = z.infer<typeof schemaMuxCatchAllId>

const schemaMuxRow = z.object({
  model: z.string().optional(),
  matcher_type: z.nativeEnum(MuxMatcherType),
  matcher: z.string(),
  id: z.union([z.string().uuid(), schemaMuxCatchAllId]),
})

export type FieldValuesMuxRow = z.infer<typeof schemaMuxRow>

export const schemaWorkspaceConfig = z.object({
  muxing_rules: z.array(schemaMuxRow),
})

export type WorkspaceConfigFieldValues = z.infer<typeof schemaWorkspaceConfig>

export const WORKSPACE_CONFIG_FIELD_NAME = schemaWorkspaceConfig.keyof().Enum
export const MUX_FIELD_NAME = schemaMuxRow.keyof().Enum
