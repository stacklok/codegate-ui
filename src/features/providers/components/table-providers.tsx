import {
  Badge,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  LinkButton,
  TableHeader,
  ResizableTableContainer,
  Button,
} from '@stacklok/ui-kit'
import { Globe02, Tool01, Trash01 } from '@untitled-ui/icons-react'
import { PROVIDER_AUTH_TYPE_MAP } from '../lib/utils'
import { useProviders } from '../hooks/use-providers'
import { match } from 'ts-pattern'
import { ComponentProps } from 'react'
import { ProviderEndpoint } from '@/api/generated'
import { useConfirmDeleteProvider } from '../hooks/use-confirm-delete-provider'

const COLUMN_MAP = {
  provider: 'provider',
  type: 'type',
  endpoint: 'endpoint',
  auth: 'auth',
  configuration: 'configuration',
} as const

type ColumnId = keyof typeof COLUMN_MAP
type Column = { id: ColumnId } & Omit<ComponentProps<typeof Column>, 'id'>
const COLUMNS: Column[] = [
  {
    id: 'provider',
    isRowHeader: true,
    children: 'Name & Description',
    minWidth: 450,
    maxWidth: 520,
  },
  {
    id: 'type',
    children: 'Provider',
    minWidth: 110,
    maxWidth: 130,
    className: 'capitalize',
  },
  { id: 'endpoint', children: 'Endpoint', minWidth: 250 },
  { id: 'auth', children: 'Authentication', minWidth: 140 },
  { id: 'configuration', alignment: 'end', minWidth: 40, children: '' },
]

function CellRenderer({
  column,
  row,
}: {
  column: Column
  row: ProviderEndpoint
}) {
  const deleteProvider = useConfirmDeleteProvider(row.name)

  return match(column.id)
    .with(COLUMN_MAP.provider, () => (
      <>
        <div className="text-primary">{row.name}</div>
        <div className="text-tertiary">{row.description}</div>
      </>
    ))
    .with(COLUMN_MAP.type, () => row.provider_type)
    .with(COLUMN_MAP.endpoint, () => (
      <div className="flex items-center gap-2">
        <Globe02 className="size-4" />
        <span>{row.endpoint}</span>
      </div>
    ))
    .with(COLUMN_MAP.auth, () => (
      <div className="flex items-center justify-between gap-2">
        {row.auth_type ? (
          <Badge size="sm" className="text-tertiary">
            {PROVIDER_AUTH_TYPE_MAP[row.auth_type]}
          </Badge>
        ) : (
          'N/A'
        )}
        <LinkButton
          variant="tertiary"
          className="flex items-center gap-2"
          href={`/providers/${row.name}`}
        >
          <Tool01 className="size-4" /> Manage
        </LinkButton>
      </div>
    ))
    .with(COLUMN_MAP.configuration, () => (
      <Button
        isIcon
        variant="tertiary"
        onPress={() =>
          deleteProvider({
            path: { provider_name: row.name as string },
          })
        }
      >
        <Trash01 />
      </Button>
    ))
    .exhaustive()
}

export function TableProviders() {
  const { data: providers = [] } = useProviders()

  return (
    <ResizableTableContainer>
      <Table aria-label="List of workspaces">
        <TableHeader columns={COLUMNS}>
          {(column) => <Column {...column} id={column.id} />}
        </TableHeader>

        <TableBody items={providers}>
          {(row) => (
            <Row columns={COLUMNS} id={`${row.id}`}>
              {(column) => (
                <Cell
                  className="h-6 group-last/row:border-b-0"
                  id={column.id}
                  alignment={column.alignment}
                >
                  <CellRenderer column={column} row={row} />
                </Cell>
              )}
            </Row>
          )}
        </TableBody>
      </Table>
    </ResizableTableContainer>
  )
}
