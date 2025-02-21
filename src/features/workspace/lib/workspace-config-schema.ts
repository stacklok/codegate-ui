import { MuxMatcherType } from '@/api/generated'
import { z } from 'zod'

const schemaWorkspaceMux = z.object({
  provider_name: z.string().nullable(),
  provider_id: z.string().uuid(),
  model: z.string(),
  matcher_type: z.nativeEnum(MuxMatcherType),
  matcher: z.string().nullable(),
})

export type WorkspaceMuxFieldValues = z.infer<typeof schemaWorkspaceMux>

export const schemaWorkspaceConfig = z.object({
  muxing_rules: z.array(schemaWorkspaceMux),
})

export type WorkspaceConfigFieldValues = z.infer<typeof schemaWorkspaceConfig>

export const WORKSPACE_CONFIG_FIELD_NAME = schemaWorkspaceConfig.keyof().Enum
export const MUX_FIELD_NAME = schemaWorkspaceMux.keyof().Enum
