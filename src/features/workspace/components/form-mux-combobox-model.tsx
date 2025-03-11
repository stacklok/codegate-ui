import { ModelByProvider } from '@/api/generated'
import { useQueryListAllModelsForAllProviders } from '@/hooks/use-query-list-all-models-for-all-providers'
import {
  ComboBoxButton,
  ComboBoxClearButton,
  ComboBoxFieldGroup,
  ComboBoxInput,
  OptionsSchema,
} from '@stacklok/ui-kit'
import { groupBy, map } from 'lodash'
import { getMuxFieldName } from '../lib/get-mux-field-name'
import { SearchMd } from '@untitled-ui/icons-react'
import { FormComboBox } from './tmp/form-combobox'
import { serializeMuxModel } from '../lib/mux-model-serde'
import { FieldValuesMuxRow } from '../lib/schema-mux'

function groupModels(
  models: ModelByProvider[] = []
): OptionsSchema<'listbox'>[] {
  return map(groupBy(models, 'provider_name'), (items, providerName) => ({
    id: providerName,
    textValue: providerName,
    items: items.map((item) => ({
      id: serializeMuxModel(item),
      textValue: item.name,
    })),
  }))
}

export function FormMuxComboboxModel({
  index,
  row,
}: {
  index: number
  row: FieldValuesMuxRow & { id: string }
}) {
  const { data: models = [] } = useQueryListAllModelsForAllProviders({
    select: groupModels,
  })

  return (
    <FormComboBox
      aria-label="Matcher"
      items={models}
      name={getMuxFieldName({
        field: 'model',
        index,
      })}
      key={row.id}
      shouldShowValidationError={false}
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
