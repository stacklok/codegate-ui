import { Conversation } from "@/api/generated";
import { useCallback } from "react";
import {
  AlertsFilterView,
  useAlertsFilterSearchParams,
} from "./use-alerts-filter-search-params";
import { multiFilter } from "@/lib/multi-filter";
import { isConversationWithMaliciousAlerts } from "../lib/is-alert-malicious";
import { isConversationWithSecretAlerts } from "../lib/is-alert-secret";
import { doesConversationIncludeSearch } from "../lib/does-alert-include-search";
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
  const { state } = useAlertsFilterSearchParams();

  // NOTE: This needs to be a stable function reference to enable memo-isation
  // of the select operation on each React re-render.
  const select = useCallback(
    (data: Conversation[]) => {
      return multiFilter(data, [FILTER[state.view]]).filter((conversation) =>
        doesConversationIncludeSearch(conversation, state.search ?? null),
      );
    },
    [state.search, state.view],
  );

  return useQueryGetWorkspaceMessages({
    select,
  });
}
