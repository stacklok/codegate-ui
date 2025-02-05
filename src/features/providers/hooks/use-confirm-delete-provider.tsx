import { useConfirm } from "@/hooks/use-confirm";
import { useCallback } from "react";
import { useMutationDeleteProvider } from "./use-mutation-delete-provider";

export function useConfirmDeleteProvider() {
  const { mutateAsync: deleteProvider } = useMutationDeleteProvider();

  const { confirm } = useConfirm();

  return useCallback(
    async (...params: Parameters<typeof deleteProvider>) => {
      const answer = await confirm(
        <>
          <p className="mb-1">
            Are you sure you want to permanently delete this provider?
          </p>
        </>,
        {
          buttons: {
            yes: "Delete",
            no: "Cancel",
          },
          title: "Permanently delete provider",
          isDestructive: true,
        }
      );
      if (answer) {
        return deleteProvider(...params);
      }
    },
    [confirm, deleteProvider]
  );
}
