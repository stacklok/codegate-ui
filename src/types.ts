import { AlertConversation, Conversation } from "./api/generated";

export type PromptState = {
  prompts: Conversation[];
  loading: boolean;
  currentPromptId: string;
  setCurrentPromptId: (id: string) => void;
  fetchPrompts: () => void;
};

export type AlertSearchState = {
  alerts: AlertConversation[];
  filteredAlerts: AlertConversation[];
  loading: boolean;
  isMaliciousFilterActive: boolean;
  search: string;
  setSearch: (search: string) => void;
  setIsMaliciousFilterActive: (isChecked: boolean) => void;
};

export type TriggerType =
  | "codegate-version"
  | "codegate-context-retriever"
  | "system-prompt"
  | "code-snippet-extractor"
  | "codegate-secrets"
  | string;

export type MaliciousPkgType = {
  name: string;
  type: string;
  status: string;
  description: string;
};
