import { TooltipTrigger, Switch, Tooltip } from "@stacklok/ui-kit";
import {
  AlertsFilterView,
  useAlertsFilterSearchParams,
} from "../hooks/use-alerts-filter-search-params";

export function SwitchMaliciousAlertsFilter() {
  const { setView, state } = useAlertsFilterSearchParams();

  return (
    <TooltipTrigger>
      <Switch
        id="malicious-packages"
        isSelected={state.view === AlertsFilterView.MALICIOUS}
        onChange={(isSelected) => {
          switch (isSelected) {
            case true:
              return setView(AlertsFilterView.MALICIOUS);
            case false:
              return setView(AlertsFilterView.ALL);
            default:
              return isSelected satisfies never;
          }
        }}
      >
        Malicious Packages
      </Switch>

      <Tooltip>
        <p>Filter by malicious packages</p>
      </Tooltip>
    </TooltipTrigger>
  );
}
