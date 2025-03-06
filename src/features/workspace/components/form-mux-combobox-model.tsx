import { ModelByProvider } from '@/api/generated'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import {
  ComboBoxButton,
  ComboBoxClearButton,
  ComboBoxFieldGroup,
  ComboBoxInput,
  FormComboBox,
  OptionsSchema,
} from '@stacklok/ui-kit'
import { groupBy, map } from 'lodash'
import { getMuxFieldName } from '../lib/get-mux-field-name'
import { SearchMd } from '@untitled-ui/icons-react'

function groupModels(
  models: ModelByProvider[] = []
): OptionsSchema<'listbox'>[] {
  return map(groupBy(models, 'provider_name'), (items, providerName) => ({
    id: providerName,
    textValue: providerName,
    items: items.map((item) => ({
      id: `${item.provider_id}/${item.name}`,
      textValue: item.name,
    })),
  }))
}

export function FormMuxComboboxModel({ index }: { index: number }) {
  const { data: models = [] } = useQueryListAllModelsForAllProviders({
    select: groupModels,
  })

  return (
    <FormComboBox
      aria-label="Matcher"
      items={models}
      name={getMuxFieldName({
        index,
        field: 'model',
      })}
    >
      <ComboBoxFieldGroup>
        <ComboBoxInput
          icon={<SearchMd />}
          isBorderless
          placeholder="Type to search..."
        />
        <ComboBoxClearButton />
        <ComboBoxButton />
      </ComboBoxFieldGroup>
    </FormComboBox>
  )
}
