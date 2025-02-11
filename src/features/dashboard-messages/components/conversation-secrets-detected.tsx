import { Alert } from "@/api/generated";
import { ReactNode } from "react";
import Markdown from "react-markdown";

function ConversationSecretsList({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>;
}

function ConversationSecretsListItem({ children }: { children: ReactNode }) {
  return (
    <li className="pb-3 mb-3 rounded border-b border-gray-200 last:border-b-0">
      {children}
    </li>
  );
}

function formatTriggerString(string: string): string {
  return string.replace(/REDACTED<[^>]*?>/g, "**REDACTED**");
}

// NOTE: The secrets detection backend code appears to be returning fairly
// unstructured data with a lot of false positives. This is not actually
// referenced in the frontend yet.
export function ConversationSecretsDetected({ alerts }: { alerts: Alert[] }) {
  return (
    <ConversationSecretsList>
      {alerts.map((a) => {
        if (typeof a.trigger_string !== "string") return null;

        return (
          <ConversationSecretsListItem key={a.id}>
            <Markdown>{formatTriggerString(a.trigger_string)}</Markdown>
          </ConversationSecretsListItem>
        );
      })}
    </ConversationSecretsList>
  );
}
