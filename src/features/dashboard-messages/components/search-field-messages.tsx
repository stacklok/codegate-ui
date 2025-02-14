import {
  FieldGroup,
  Input,
  Kbd,
  SearchField,
  SearchFieldClearButton,
} from '@stacklok/ui-kit'
import { useMessagesFilterSearchParams } from '../hooks/use-messages-filter-search-params'
import { SearchMd } from '@untitled-ui/icons-react'
import { useKbdShortcuts } from '@/hooks/use-kbd-shortcuts'
import { useRef } from 'react'

export function SearchFieldMessages({ className }: { className?: string }) {
  const { setSearch, state } = useMessagesFilterSearchParams()
  const ref = useRef<HTMLInputElement>(null)
  useKbdShortcuts([
    [
      '/',
      () => {
        ref.current?.focus()
      },
    ],
  ])

  return (
    <SearchField
      type="text"
      aria-label="Search messages"
      value={state.search ?? ''}
      onChange={(value) => setSearch(value)}
      className={className}
    >
      <FieldGroup>
        <Input
          ref={ref}
          type="search"
          placeholder="Search..."
          isBorderless
          icon={<SearchMd />}
        />
        <SearchFieldClearButton />
        <Kbd className="mr-3">/</Kbd>
      </FieldGroup>
    </SearchField>
  )
}
