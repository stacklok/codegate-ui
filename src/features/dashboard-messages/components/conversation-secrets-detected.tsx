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
    <li className="grid grid-cols-[1fr_2fr] px-2 py-0.5 rounded ">
      <span className="block font-bold">{title}</span>
      <span className="block truncate">{value}</span>
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
      {alerts.map((v) => {
        console.debug("👉  v:", v);
        const { key, redactedValue } = parseUnstructuredSecretsData(v) || {};
        return (
          <ConversationSecretsListItem
            title={key}
            value={redactedValue}
            key={v.id}
          />
        );
      })}
    </ConversationSecretsList>
  );
}
