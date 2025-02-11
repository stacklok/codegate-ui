import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export enum ConversationView {
  OVERVIEW = "overview",
  SECRETS = "secrets",
}

const conversationParamsSchema = z.object({
  view: z
    .nativeEnum(ConversationView)
    .optional()
    .default(ConversationView.OVERVIEW),
});

type ConversationParamsSchema = z.input<typeof conversationParamsSchema>;

const DEFAULT_FILTER = {
  view: ConversationView.OVERVIEW,
} as const satisfies ConversationParamsSchema;

export const useConversationSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(DEFAULT_FILTER),
  );

  const setView = useCallback(
    (view: ConversationView) => {
      setSearchParams((prev) => {
        if (view) prev.set("view", view);
        if (!view) prev.delete("view");

        return prev;
      });
    },
    [setSearchParams],
  );

  const state = conversationParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  return { state, setView };
};
