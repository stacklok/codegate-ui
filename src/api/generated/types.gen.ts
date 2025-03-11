// This file is auto-generated by @hey-api/openapi-ts

export type ActivateWorkspaceRequest = {
  name: string
}

export type ActiveWorkspace = {
  name: string
  is_active: boolean
  last_updated: unknown
}

/**
 * Represents a request to add a provider endpoint.
 */
export type AddProviderEndpointRequest = {
  id?: string | null
  name: string
  description?: string
  provider_type: ProviderType
  endpoint?: string
  auth_type?: ProviderAuthType
  api_key?: string | null
}

/**
 * Represents an alert.
 */
export type Alert = {
  id: string
  prompt_id: string
  code_snippet: CodeSnippet | null
  trigger_string:
    | string
    | {
        [key: string]: unknown
      }
    | null
  trigger_type: string
  trigger_category: AlertSeverity
  timestamp: string
}

/**
 * Represents an alert with it's respective conversation.
 */
export type AlertConversation = {
  conversation: Conversation
  alert_id: string
  code_snippet: CodeSnippet | null
  trigger_string:
    | string
    | {
        [key: string]: unknown
      }
    | null
  trigger_type: string
  trigger_category: string | null
  timestamp: string
}

export enum AlertSeverity {
  INFO = 'info',
  CRITICAL = 'critical',
}

/**
 * Represents a set of summary alerts
 */
export type AlertSummary = {
  malicious_packages: number
  pii: number
  secrets: number
  total_alerts: number
}

export enum AlertTriggerType {
  CODEGATE_PII = 'codegate-pii',
  CODEGATE_CONTEXT_RETRIEVER = 'codegate-context-retriever',
  CODEGATE_SECRETS = 'codegate-secrets',
}

/**
 * Represents a chat message.
 */
export type ChatMessage = {
  message: string
  timestamp: string
  message_id: string
}

/**
 * Represents a code snippet with its programming language.
 *
 * Args:
 * language: The programming language identifier (e.g., 'python', 'javascript')
 * code: The actual code content
 */
export type CodeSnippet = {
  code: string
  language: string | null
  filepath: string | null
  libraries?: Array<string>
  file_extension?: string | null
}

/**
 * Represents a request to configure auth material for a provider.
 */
export type ConfigureAuthMaterial = {
  auth_type: ProviderAuthType
  api_key?: string | null
}

/**
 * Represents a conversation.
 */
export type Conversation = {
  question_answers: Array<QuestionAnswer>
  provider: string | null
  type: QuestionType
  chat_id: string
  conversation_timestamp: string
  token_usage_agg: TokenUsageAggregate | null
  alerts?: Array<Alert> | null
}

/**
 * Represents a conversation summary.
 */
export type ConversationSummary = {
  chat_id: string
  prompt: ChatMessage
  alerts_summary: AlertSummary
  token_usage_agg: TokenUsageAggregate | null
  provider: string | null
  type: QuestionType
  conversation_timestamp: string
}

export type CustomInstructions = {
  prompt: string
}

export type FullWorkspace_Input = {
  name: string
  config?: WorkspaceConfig_Input | null
}

export type FullWorkspace_Output = {
  name: string
  config?: WorkspaceConfig_Output | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type ListActiveWorkspacesResponse = {
  workspaces: Array<ActiveWorkspace>
}

export type ListWorkspacesResponse = {
  workspaces: Array<Workspace>
}

/**
 * Represents a model supported by a provider.
 *
 * Note that these are auto-discovered by the provider.
 */
export type ModelByProvider = {
  name: string
  provider_id: string
  provider_name: string
}

/**
 * Represents the different types of matchers we support.
 *
 * The 3 rules present match filenames and request types. They're used in conjunction with the
 * matcher field in the MuxRule model.
 * E.g.
 * - catch_all-> Always match
 * - filename_match and match: requests.py -> Match the request if the filename is requests.py
 * - fim_filename and match: main.py -> Match the request if the request type is fim
 * and the filename is main.py
 *
 * NOTE: Removing or updating fields from this enum will require a migration.
 * Adding new fields is safe.
 */
export enum MuxMatcherType {
  CATCH_ALL = 'catch_all',
  FILENAME_MATCH = 'filename_match',
  FIM_FILENAME = 'fim_filename',
  CHAT_FILENAME = 'chat_filename',
}

/**
 * Represents a mux rule for a provider.
 */
export type MuxRule = {
  provider_name?: string | null
  provider_id: string
  model: string
  matcher_type: MuxMatcherType
  matcher?: string | null
}

export type PaginatedMessagesResponse = {
  data: Array<ConversationSummary>
  limit: number
  offset: number
  total: number
}

/**
 * Represents a persona object.
 */
export type Persona = {
  id: string
  name: string
  description: string
}

/**
 * Model for creating a new Persona.
 */
export type PersonaRequest = {
  name: string
  description: string
}

/**
 * Model for updating a Persona.
 */
export type PersonaUpdateRequest = {
  new_name: string
  new_description: string
}

/**
 * Represents the different types of auth we support for providers.
 */
export enum ProviderAuthType {
  NONE = 'none',
  PASSTHROUGH = 'passthrough',
  API_KEY = 'api_key',
}

/**
 * Represents a provider's endpoint configuration. This
 * allows us to persist the configuration for each provider,
 * so we can use this for muxing messages.
 */
export type ProviderEndpoint = {
  id?: string | null
  name: string
  description?: string
  provider_type: ProviderType
  endpoint?: string
  auth_type?: ProviderAuthType
}

/**
 * Represents the different types of providers we support.
 */
export enum ProviderType {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  VLLM = 'vllm',
  OLLAMA = 'ollama',
  LM_STUDIO = 'lm_studio',
  LLAMACPP = 'llamacpp',
  OPENROUTER = 'openrouter',
}

/**
 * Represents a question and answer pair.
 */
export type QuestionAnswer = {
  question: ChatMessage
  answer: ChatMessage | null
}

export enum QuestionType {
  CHAT = 'chat',
  FIM = 'fim',
}

/**
 * TokenUsage it's not a table, it's a model to represent the token usage.
 * The data is stored in the outputs table.
 */
export type TokenUsage = {
  input_tokens?: number
  output_tokens?: number
  input_cost?: number
  output_cost?: number
}

/**
 * Represents the tokens used. Includes the information of the tokens used by model.
 * `used_tokens` are the total tokens used in the `tokens_by_model` list.
 */
export type TokenUsageAggregate = {
  tokens_by_model: {
    [key: string]: TokenUsageByModel
  }
  token_usage: TokenUsage
}

/**
 * Represents the tokens used by a model.
 */
export type TokenUsageByModel = {
  provider_type: ProviderType
  model: string
  token_usage: TokenUsage
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}

export type Workspace = {
  name: string
  is_active: boolean
}

export type WorkspaceConfig_Input = {
  custom_instructions: string
  muxing_rules: Array<MuxRule>
}

export type WorkspaceConfig_Output = {
  custom_instructions: string
  muxing_rules: Array<MuxRule>
}

/**
 * Returns a workspace ID with model name
 */
export type WorkspaceWithModel = {
  id: string
  name: string
  provider_model_name: string
}

export type HealthCheckHealthGetResponse = unknown

export type HealthCheckHealthGetError = unknown

export type V1ListProviderEndpointsData = {
  query?: {
    name?: string | null
  }
}

export type V1ListProviderEndpointsResponse = Array<ProviderEndpoint>

export type V1ListProviderEndpointsError = HTTPValidationError

export type V1AddProviderEndpointData = {
  body: AddProviderEndpointRequest
}

export type V1AddProviderEndpointResponse = ProviderEndpoint

export type V1AddProviderEndpointError = HTTPValidationError

export type V1ListAllModelsForAllProvidersResponse = Array<ModelByProvider>

export type V1ListAllModelsForAllProvidersError = unknown

export type V1ListModelsByProviderData = {
  path: {
    provider_id: string
  }
}

export type V1ListModelsByProviderResponse = Array<ModelByProvider>

export type V1ListModelsByProviderError = HTTPValidationError

export type V1GetProviderEndpointData = {
  path: {
    provider_id: string
  }
}

export type V1GetProviderEndpointResponse = ProviderEndpoint

export type V1GetProviderEndpointError = HTTPValidationError

export type V1UpdateProviderEndpointData = {
  body: ProviderEndpoint
  path: {
    provider_id: string
  }
}

export type V1UpdateProviderEndpointResponse = ProviderEndpoint

export type V1UpdateProviderEndpointError = HTTPValidationError

export type V1DeleteProviderEndpointData = {
  path: {
    provider_id: string
  }
}

export type V1DeleteProviderEndpointResponse = unknown

export type V1DeleteProviderEndpointError = HTTPValidationError

export type V1ConfigureAuthMaterialData = {
  body: ConfigureAuthMaterial
  path: {
    provider_id: string
  }
}

export type V1ConfigureAuthMaterialResponse = void

export type V1ConfigureAuthMaterialError = HTTPValidationError

export type V1ListWorkspacesResponse = ListWorkspacesResponse

export type V1ListWorkspacesError = unknown

export type V1CreateWorkspaceData = {
  body: FullWorkspace_Input
}

export type V1CreateWorkspaceResponse = FullWorkspace_Output

export type V1CreateWorkspaceError = HTTPValidationError

export type V1ListActiveWorkspacesResponse = ListActiveWorkspacesResponse

export type V1ListActiveWorkspacesError = unknown

export type V1ActivateWorkspaceData = {
  body: ActivateWorkspaceRequest
  query?: {
    status_code?: unknown
  }
}

export type V1ActivateWorkspaceResponse = unknown

export type V1ActivateWorkspaceError = HTTPValidationError

export type V1UpdateWorkspaceData = {
  body: FullWorkspace_Input
  path: {
    workspace_name: string
  }
}

export type V1UpdateWorkspaceResponse = FullWorkspace_Output

export type V1UpdateWorkspaceError = HTTPValidationError

export type V1DeleteWorkspaceData = {
  path: {
    workspace_name: string
  }
}

export type V1DeleteWorkspaceResponse = unknown

export type V1DeleteWorkspaceError = HTTPValidationError

export type V1ListArchivedWorkspacesResponse = ListWorkspacesResponse

export type V1ListArchivedWorkspacesError = unknown

export type V1RecoverWorkspaceData = {
  path: {
    workspace_name: string
  }
}

export type V1RecoverWorkspaceResponse = void

export type V1RecoverWorkspaceError = HTTPValidationError

export type V1HardDeleteWorkspaceData = {
  path: {
    workspace_name: string
  }
}

export type V1HardDeleteWorkspaceResponse = unknown

export type V1HardDeleteWorkspaceError = HTTPValidationError

export type V1GetWorkspaceAlertsData = {
  path: {
    workspace_name: string
  }
}

export type V1GetWorkspaceAlertsResponse = Array<AlertConversation | null>

export type V1GetWorkspaceAlertsError = HTTPValidationError

export type V1GetWorkspaceAlertsSummaryData = {
  path: {
    workspace_name: string
  }
}

export type V1GetWorkspaceAlertsSummaryResponse = AlertSummary

export type V1GetWorkspaceAlertsSummaryError = HTTPValidationError

export type V1GetWorkspaceMessagesData = {
  path: {
    workspace_name: string
  }
  query?: {
    filter_by_alert_trigger_types?: Array<AlertTriggerType> | null
    filter_by_ids?: Array<string> | null
    page?: number
    page_size?: number
  }
}

export type V1GetWorkspaceMessagesResponse = PaginatedMessagesResponse

export type V1GetWorkspaceMessagesError = HTTPValidationError

export type V1GetMessagesByPromptIdData = {
  path: {
    prompt_id: string
    workspace_name: string
  }
}

export type V1GetMessagesByPromptIdResponse = Conversation

export type V1GetMessagesByPromptIdError = HTTPValidationError

export type V1GetWorkspaceCustomInstructionsData = {
  path: {
    workspace_name: string
  }
}

export type V1GetWorkspaceCustomInstructionsResponse = CustomInstructions

export type V1GetWorkspaceCustomInstructionsError = HTTPValidationError

export type V1SetWorkspaceCustomInstructionsData = {
  body: CustomInstructions
  path: {
    workspace_name: string
  }
}

export type V1SetWorkspaceCustomInstructionsResponse = void

export type V1SetWorkspaceCustomInstructionsError = HTTPValidationError

export type V1DeleteWorkspaceCustomInstructionsData = {
  path: {
    workspace_name: string
  }
}

export type V1DeleteWorkspaceCustomInstructionsResponse = void

export type V1DeleteWorkspaceCustomInstructionsError = HTTPValidationError

export type V1GetWorkspaceMuxesData = {
  path: {
    workspace_name: string
  }
}

export type V1GetWorkspaceMuxesResponse = Array<MuxRule>

export type V1GetWorkspaceMuxesError = HTTPValidationError

export type V1SetWorkspaceMuxesData = {
  body: Array<MuxRule>
  path: {
    workspace_name: string
  }
}

export type V1SetWorkspaceMuxesResponse = void

export type V1SetWorkspaceMuxesError = HTTPValidationError

export type V1ListWorkspacesByProviderData = {
  path: {
    provider_id: string
  }
}

export type V1ListWorkspacesByProviderResponse = Array<WorkspaceWithModel>

export type V1ListWorkspacesByProviderError = HTTPValidationError

export type V1StreamSseResponse = unknown

export type V1StreamSseError = unknown

export type V1VersionCheckResponse = unknown

export type V1VersionCheckError = unknown

export type V1GetWorkspaceTokenUsageData = {
  path: {
    workspace_name: string
  }
}

export type V1GetWorkspaceTokenUsageResponse = TokenUsageAggregate

export type V1GetWorkspaceTokenUsageError = HTTPValidationError

export type V1ListPersonasResponse = Array<Persona>

export type V1ListPersonasError = unknown

export type V1CreatePersonaData = {
  body: PersonaRequest
}

export type V1CreatePersonaResponse = Persona

export type V1CreatePersonaError = HTTPValidationError

export type V1GetPersonaData = {
  path: {
    persona_name: string
  }
}

export type V1GetPersonaResponse = Persona

export type V1GetPersonaError = HTTPValidationError

export type V1UpdatePersonaData = {
  body: PersonaUpdateRequest
  path: {
    persona_name: string
  }
}

export type V1UpdatePersonaResponse = Persona

export type V1UpdatePersonaError = HTTPValidationError

export type V1DeletePersonaData = {
  path: {
    persona_name: string
  }
}

export type V1DeletePersonaResponse = void

export type V1DeletePersonaError = HTTPValidationError
