import { Conversation } from "@/api/generated";
import { useCallback } from "react";
import {
  AlertsFilterView,
  useMessagesFilterSearchParams,
} from "./use-messages-filter-search-params";
import { multiFilter } from "@/lib/multi-filter";
import { isConversationWithMaliciousAlerts } from "../lib/is-alert-malicious";
import { isConversationWithSecretAlerts } from "../lib/is-alert-secret";
import { filterMessagesBySubstring } from "../lib/filter-messages-by-substring";
import { useQueryGetWorkspaceMessages } from "@/hooks/use-query-get-workspace-messages";

const FILTER: Record<
  AlertsFilterView,
  (alert: Conversation | null) => boolean
> = {
  all: () => true,
  malicious: isConversationWithMaliciousAlerts,
  secrets: isConversationWithSecretAlerts,
};

export function useQueryGetWorkspaceMessagesTable() {
  const { state } = useMessagesFilterSearchParams();

  // NOTE: This needs to be a stable function reference to enable memo-isation
  // of the select operation on each React re-render.
  const select = useCallback(
    (data: Conversation[]) => {
      return multiFilter(data, [FILTER[state.view]])
        .filter((conversation) =>
          filterMessagesBySubstring(conversation, state.search ?? null)
        )
        .sort((a, b) =>
          b.conversation_timestamp > a.conversation_timestamp ? 1 : -1
        );
    },
    [state.search, state.view]
  );

  return useQueryGetWorkspaceMessages({
    select,
  });
}
