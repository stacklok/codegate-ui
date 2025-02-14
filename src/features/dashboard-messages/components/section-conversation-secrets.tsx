import { IllustrationDone } from "@stacklok/ui-kit";
import { isAlertSecret } from "@/lib/is-alert-secret";
import { ConversationSecretsDetected } from "./conversation-secrets-detected";
import { EmptyState } from "@/components/empty-state";
import { emptyStateStrings } from "../../../constants/empty-state-strings";
import { Conversation } from "@/api/generated";

export function SectionConversationSecrets({
  conversation,
}: {
  conversation: Conversation;
}) {
  const secrets = conversation.alerts?.filter(isAlertSecret) ?? [];

  if (secrets.length === 0)
    return (
      <EmptyState
        title={emptyStateStrings.title.noLeakedSecretsDetected}
        body={emptyStateStrings.body.secretsDesc}
        illustration={IllustrationDone}
        actions={null}
      />
    );

  return (
    <section className="py-4 border-b-gray-200 border-b ">
      <p className="mb-2">
        CodeGate helps you protect sensitive information from being accidentally
        exposed to AI models and third-party AI provider systems by redacting
        detected secrets from your prompts using encryption.
      </p>
      <p className="mb-2">
        The following secrets were detected in plain-text in the input provided
        to the LLM.
      </p>

      <ConversationSecretsDetected alerts={secrets} />
    </section>
  );
}
