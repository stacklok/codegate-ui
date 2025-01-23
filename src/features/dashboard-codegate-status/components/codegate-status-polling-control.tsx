import { Dispatch, SetStateAction } from "react";
import { Label, Select, SelectButton, OptionsSchema } from "@stacklok/ui-kit";

// NOTE: We don't poll more than once per minute, as the server depends on
// Github's public API, which is rate limited to 60reqs per hour.
export const POLLING_INTERVAl = {
  "1_MIN": { value: 60_000, name: "1 minute" },
  "5_MIN": { value: 300_000, name: "5 minutes" },
  "10_MIN": { value: 600_000, name: "10 minutes" },
} as const;

export const INTERVAL_SELECT_ITEMS: OptionsSchema<"listbox">[] = Object.entries(
  POLLING_INTERVAl,
).map(([key, { name }]) => {
  return { textValue: name, id: key };
});

export const DEFAULT_INTERVAL: PollingInterval = "5_MIN";

export type PollingInterval = keyof typeof POLLING_INTERVAl;

export function PollIntervalControl({
  className,
  pollingInterval,
  setPollingInterval,
}: {
  className?: string;
  pollingInterval: PollingInterval;
  setPollingInterval: Dispatch<SetStateAction<PollingInterval>>;
}) {
  return (
    <Select
      className={className}
      onSelectionChange={(v) =>
        setPollingInterval(v.toString() as PollingInterval)
      }
      items={INTERVAL_SELECT_ITEMS}
      defaultSelectedKey={pollingInterval}
    >
      <Label className="w-full text-right font-semibold text-secondary -mb-1">
        Check for updates
      </Label>
      <SelectButton
        isBorderless
        className="h-7 max-w-36 pr-0 [&>span>span]:text-right [&>span>span]:justify-end !gap-0 text-secondary"
      />
    </Select>
  );
}
