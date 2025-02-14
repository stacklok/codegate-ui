import {
  ModelByProvider,
  MuxRule,
  V1ListAllModelsForAllProvidersResponse,
} from '@/api/generated'
import {
  DialogTrigger,
  Button,
  Popover,
  SearchField,
  ListBox,
  Input,
  OptionRenderer,
  OptionsSchema,
} from '@stacklok/ui-kit'
import { ChevronDown, SearchMd } from '@untitled-ui/icons-react'
import { useState } from 'react'

type Props = {
  rule: MuxRule & { id: string }
  isArchived: boolean
  models: V1ListAllModelsForAllProvidersResponse
  onChange: ({
    model,
    provider_id,
  }: {
    model: string
    provider_id: string
  }) => void
}

function groupModelsByProviderName(
  models: ModelByProvider[]
): OptionsSchema<'listbox', string>[] {
  return models.reduce<OptionsSchema<'listbox', string>[]>(
    (groupedProviders, item) => {
      const providerData = groupedProviders.find(
        (group) => group.id === item.provider_name
      )
      if (!providerData) {
        groupedProviders.push({
          id: item.provider_name,
          items: [],
          textValue: item.provider_name,
        })
      }

      ;(providerData?.items ?? []).push({
        id: `${item.provider_id}_${item.name}`,
        textValue: item.name,
      })

      return groupedProviders
    },
    []
  )
}

function filterModels({
  groupedModels,
  searchItem,
}: {
  searchItem: string
  groupedModels: OptionsSchema<'listbox', string>[]
}) {
  const test = groupedModels
    .map((modelData) => {
      if (!searchItem) return modelData
      const filteredModels = modelData.items?.filter((item) => {
        return item.textValue.includes(searchItem)
      })

      const data = {
        ...modelData,
        items: filteredModels,
      }
      return data
    })
    .filter((item) => (item.items ? item.items.length > 0 : false))

  return test
}

export function WorkspaceModelsDropdown({
  rule,
  isArchived,
  models = [],
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const groupedModels = groupModelsByProviderName(models)
  console.log({ groupedModels, rule: rule })
  const currentProvider = models.find((p) => p.provider_id === rule.provider_id)
  const currentModel =
    currentProvider && rule.model
      ? `${currentProvider?.provider_name}/${rule.model}`
      : ''
  const selectedKey = `${rule.provider_id}_${rule.model}`

  return (
    <div className="flex w-full">
      <DialogTrigger isOpen={isOpen} onOpenChange={(test) => setIsOpen(test)}>
        <Button
          variant="secondary"
          isDisabled={isArchived}
          data-testid="workspace-models-dropdown"
          className="flex w-full cursor-pointer justify-between border-gray-400 bg-gray-25
            font-normal shadow-none"
        >
          <span>{currentModel || 'Select a model'}</span>
          <ChevronDown className="shrink-0" />
        </Button>

        <Popover className="w-[32rem] p-3" placement="top end">
          <SearchField onChange={setSearchItem} autoFocus aria-label="search">
            <Input icon={<SearchMd />} />
          </SearchField>

          <ListBox
            aria-label="models"
            items={filterModels({ searchItem, groupedModels })}
            selectionMode="single"
            selectionBehavior="replace"
            selectedKeys={selectedKey ? [selectedKey] : []}
            onSelectionChange={(v) => {
              if (v === 'all') {
                return
              }
              const selectedValue = v.values().next().value
              if (!selectedValue && typeof selectedValue !== 'string') return
              if (typeof selectedValue === 'string') {
                const [provider_id, modelName] = selectedValue.split('_')
                if (!provider_id || !modelName) return
                onChange({
                  model: modelName,
                  provider_id,
                })
                setIsOpen(false)
              }
            }}
            className="-mx-1 mt-2 max-h-72 overflow-auto"
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
        </Popover>
      </DialogTrigger>
    </div>
  )
}
