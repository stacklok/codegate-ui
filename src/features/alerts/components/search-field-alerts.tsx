import {
  FieldGroup,
  Input,
  SearchField,
  SearchFieldClearButton,
} from "@stacklok/ui-kit";
import { useAlertsFilterSearchParams } from "../hooks/use-alerts-filter-search-params";
import { SearchMd } from "@untitled-ui/icons-react";

export function SearchFieldAlerts() {
  const { setSearch, state } = useAlertsFilterSearchParams();

  return (
    <SearchField
      type="text"
      aria-label="Search alerts"
      value={state.search ?? ""}
      onChange={(value) => setSearch(value.toLowerCase().trim())}
    >
      <FieldGroup>
        <Input
          type="search"
          placeholder="Search..."
          isBorderless
          icon={<SearchMd />}
        />
        <SearchFieldClearButton />
      </FieldGroup>
    </SearchField>
  );
}
