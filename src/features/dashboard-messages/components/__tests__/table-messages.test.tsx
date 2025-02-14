import { it, expect } from 'vitest'

import { render, screen, waitFor } from '@/lib/test-utils'
import { TABLE_MESSAGES_COLUMNS } from '../../constants/table-messages-columns'

import { TableMessages } from '../table-messages'

it.each(TABLE_MESSAGES_COLUMNS)('contains $children header', async (column) => {
  render(<TableMessages />)

  await waitFor(() => {
    expect(
      screen.getByRole('columnheader', {
        name: column.children as string,
      })
    ).toBeVisible()
  })
})
