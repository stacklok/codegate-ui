import { useQueryClient } from "@tanstack/react-query";
import { PollingInterval } from "./codegate-status-polling-control";
import { getQueryOptionsCodeGateStatus } from "../../header/hooks/use-codegate-status";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@stacklok/ui-kit";
import { RefreshCcw } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function CodeGateStatusRefreshButton({
  pollingInterval,
  className,
}: {
  pollingInterval: PollingInterval;
  className?: string;
}) {
  const queryClient = useQueryClient();
  const { queryKey } = getQueryOptionsCodeGateStatus(pollingInterval);

  const [refreshed, setRefreshed] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => setRefreshed(false), 500);
    return () => clearTimeout(id);
  }, [refreshed]);

  const handleRefresh = useCallback(() => {
    setRefreshed(true);
    return queryClient.invalidateQueries({ queryKey, refetchType: "all" });
  }, [queryClient, queryKey]);

  return (
    <Button
      onPress={handleRefresh}
      variant="tertiary"
      className={twMerge("size-7", className)}
      isDisabled={refreshed}
    >
      <RefreshCcw className={refreshed ? "animate-spin-once" : undefined} />
    </Button>
  );
}
