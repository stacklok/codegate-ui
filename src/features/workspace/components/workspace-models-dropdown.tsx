import {
  ModelByProvider,
  MuxRule,
  V1ListAllModelsForAllProvidersResponse,
} from "@/api/generated";
import {
  DialogTrigger,
  Button,
  Popover,
  SearchField,
  ListBox,
  Input,
  OptionRenderer,
  OptionsSchema,
} from "@stacklok/ui-kit";
import { ChevronDown, SearchMd } from "@untitled-ui/icons-react";
import { useState } from "react";

type Props = {
  rule: MuxRule & { id: string };
  models: V1ListAllModelsForAllProvidersResponse;
  onChange: ({
    model,
    provider_id,
  }: {
    model: string;
    provider_id: string;
  }) => void;
};

function groupModelsByProviderName(
  models: ModelByProvider[],
): OptionsSchema<"listbox", string>[] {
  return models.reduce<OptionsSchema<"listbox", string>[]>(
    (groupedProviders, item) => {
      const providerData = groupedProviders.find(
        (group) => group.id === item.provider_name,
      );
      if (!providerData) {
        groupedProviders.push({
          id: item.provider_name,
          items: [],
          textValue: item.provider_name,
        });
      }

      (providerData?.items ?? []).push({
        id: item.name,
        textValue: item.name,
      });

      return groupedProviders;
    },
    [],
  );
}

function filterModels({
  groupedModels,
  searchItem,
}: {
  searchItem: string;
  groupedModels: OptionsSchema<"listbox", string>[];
}) {
  return groupedModels
    .map((modelData) => {
      if (!searchItem) return modelData;
      const filteredModels = modelData.items?.filter((item) => {
        return item.textValue.includes(searchItem);
      });

      const data = {
        ...modelData,
        items: filteredModels,
      };
      return data;
    })
    .filter((item) => (item.items ? item.items.length > 0 : false));
}

export function WorkspaceModelsDropdown({
  rule,
  models = [],
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const groupedModels = groupModelsByProviderName(models);
  const currentProvider = models.find(
    (p) => p.provider_id === rule.provider_id,
  );
  const currentModel =
    currentProvider && rule.model
      ? `${currentProvider?.provider_name}/${rule.model}`
      : "";

  return (
    <div className="w-full flex">
      <DialogTrigger isOpen={isOpen} onOpenChange={(test) => setIsOpen(test)}>
        <Button
          variant="secondary"
          className="flex justify-between cursor-pointer bg-gray-25 border-gray-400 shadow-none font-normal w-full"
        >
          {currentModel}
          <ChevronDown />
        </Button>

        <Popover className="w-[32rem] p-3" placement="top end">
          <div>
            <div>
              <SearchField
                onChange={setSearchItem}
                autoFocus
                aria-label="search"
              >
                <Input icon={<SearchMd />} />
              </SearchField>
            </div>

            <ListBox
              aria-label="models"
              items={filterModels({ searchItem, groupedModels })}
              selectionMode="single"
              selectionBehavior="replace"
              selectedKeys={rule.model ? [rule.model] : []}
              onSelectionChange={(v) => {
                if (v === "all") {
                  return;
                }
                const selectedValue = v.values().next().value;
                const providerId = models.find(
                  (item) => item.name === selectedValue,
                )?.provider_id;
                if (typeof selectedValue === "string" && providerId) {
                  onChange({
                    model: selectedValue,
                    provider_id: providerId,
                  });

                  setIsOpen(false);
                }
              }}
              className="-mx-1 my-2 max-h-80 overflow-auto"
              renderEmptyState={() => (
                <p className="text-center">No models found</p>
              )}
            >
              {({ items, id, textValue }) => (
                <OptionRenderer
                  items={items}
                  id={id}
                  textValue={textValue}
                  type="listbox"
                />
              )}
            </ListBox>
          </div>
        </Popover>
      </DialogTrigger>
    </div>
  );
}
