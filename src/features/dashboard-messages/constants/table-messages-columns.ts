import { Column } from '@stacklok/ui-kit'
import { ComponentProps } from 'react'

type ColumnId = 'time' | 'type' | 'prompt' | 'alerts' | 'token_usage'

export type TableMessagesColumn = { id: ColumnId; children: string } & Omit<
  ComponentProps<typeof Column>,
  'id' | 'children'
>

export const TABLE_MESSAGES_COLUMNS: TableMessagesColumn[] = [
  {
    id: 'time',
    isRowHeader: true,
    children: 'Time',
    width: 160,
  },
  {
    id: 'type',
    children: 'Type',
    minWidth: 170,
    maxWidth: 200,
  },
  {
    id: 'prompt',
    children: 'Prompt',
  },
  {
    id: 'alerts',
    children: 'Alerts',
    alignment: 'start',
    minWidth: 110,
    maxWidth: 160,
  },
  {
    id: 'token_usage',
    children: 'Token usage',
    width: 200,
  },
]
