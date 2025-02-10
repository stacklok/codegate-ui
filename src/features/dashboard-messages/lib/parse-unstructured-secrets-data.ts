import { Alert } from "@/api/generated";

export function parseUnstructuredSecretsData(alert: Alert): {
  key: string | null;
  redactedValue: string | null;
} {
  const keyMatch = (alert.trigger_string as string)?.match(/- Key: (\w+)/);

  const key = keyMatch?.[1] ?? null;

  const redactedValueMatch = key
    ? (alert.trigger_string as string)?.match(new RegExp(`${key}="[^"]*?"`))
    : null;

  const redactedValue = redactedValueMatch?.[0] ?? null;

  return { key, redactedValue };
}
