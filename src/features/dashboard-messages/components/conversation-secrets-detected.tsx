import { Alert } from "@/api/generated";
import { parseUnstructuredSecretsData } from "../lib/parse-unstructured-secrets-data";
import { ReactNode } from "react";

function ConversationSecretsList({ children }: { children: ReactNode }) {
  return (
    <ul className="block grow [&>*:nth-child(odd)]:bg-gray-50">{children}</ul>
  );
}

function ConversationSecretsListItem({
  title,
  value,
}: {
  title: ReactNode;
  value: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[1fr_4fr] px-2 py-0.5 rounded ">
      <code className="block font-bold">{title}</code>
      <code className="block truncate">{value}</code>
    </li>
  );
}

// NOTE: The secrets detection backend code appears to be returning fairly
// unstructured data with a lot of false positives. This is not actually
// referenced in the frontend yet.
export function ConversationSecretsDetected({
  alerts,
}: {
  alerts: (Omit<Alert, "trigger_string"> & { trigger_string: string })[];
}) {
  return (
    <ConversationSecretsList>
      {alerts.map((a) => {
        const { key, redactedValue } = parseUnstructuredSecretsData(a) || {};

        if (!key) return null;

        return (
          <ConversationSecretsListItem
            title={key}
            value={redactedValue ?? "N/A"}
            key={a.id}
          />
        );
      })}
    </ConversationSecretsList>
  );
}
