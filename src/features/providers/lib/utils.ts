import { ProviderAuthType, ProviderType } from "@/api/generated";

export const PROVIDER_AUTH_TYPE_MAP = {
  [ProviderAuthType.NONE]: "None",
  [ProviderAuthType.PASSTHROUGH]: "Passthrough",
  [ProviderAuthType.API_KEY]: "API Key",
};

export function getAuthTypeOptions() {
  return Object.entries(PROVIDER_AUTH_TYPE_MAP).map(([id, textValue]) => ({
    id,
    textValue,
  }));
}

export function getProviderType() {
  return Object.values(ProviderType).map((textValue) => ({
    id: textValue,
    textValue,
  }));
}

export function isProviderType(value: unknown): value is ProviderType {
  return Object.values(ProviderType).includes(value as ProviderType);
}

export function isProviderAuthType(value: unknown): value is ProviderAuthType {
  return Object.values(ProviderAuthType).includes(value as ProviderAuthType);
}
