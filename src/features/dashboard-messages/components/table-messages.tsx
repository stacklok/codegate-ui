import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  Button,
  ResizableTableContainer,
  Tooltip,
  TooltipTrigger,
} from '@stacklok/ui-kit'
import { Alert, Conversation, QuestionType } from '@/api/generated'
import { remark } from 'remark'
import strip from 'strip-markdown'

import { TableAlertTokenUsage } from './table-alert-token-usage'

import { Key01, PackageX, User01 } from '@untitled-ui/icons-react'
import {
  EmptyStateError,
  TableMessagesEmptyState,
} from './table-messages-empty-state'
import { hrefs } from '@/lib/hrefs'
import { isAlertMalicious } from '../../../lib/is-alert-malicious'
import { isAlertSecret } from '../../../lib/is-alert-secret'
import { twMerge } from 'tailwind-merge'
import { useQueryGetWorkspaceMessagesTable } from '../hooks/use-query-get-workspace-messages-table'
import {
  TABLE_MESSAGES_COLUMNS,
  TableMessagesColumn,
} from '../constants/table-messages-columns'
import { formatTime } from '@/lib/format-time'
import { isAlertPii } from '@/lib/is-alert-pii'
import { TableMessagesPagination } from './table-messages-pagination'

const getPromptText = (conversation: Conversation) => {
  const markdownSource =
    conversation.question_answers[0]?.question?.message ?? 'N/A'
  const fullText = remark().use(strip).processSync(markdownSource)

  return fullText.toString().trim().slice(0, 200) // arbitrary slice to prevent long prompts
}

function getTypeText(type: QuestionType) {
  switch (type) {
    case QuestionType.CHAT:
      return 'Chat'
    case QuestionType.FIM:
      return 'Fill in the middle (FIM)'
    default:
      return 'Unknown'
  }
}

function countAlerts(alerts: Alert[]): {
  secrets: number
  malicious: number
  pii: number
} {
  return {
    secrets: alerts.filter(isAlertSecret).length,
    malicious: alerts.filter(isAlertMalicious).length,
    pii: alerts.filter(isAlertPii).length,
  }
}

function AlertsSummaryCount({
  count,
  icon: Icon,
  strings,
}: {
  count: number
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
  strings: {
    singular: string
    plural: string
  }
}) {
  const tooltipText = `${count} ${count === 1 ? strings.singular : strings.plural} detected`

  return (
    <TooltipTrigger delay={0}>
      <Button
        aria-label={`${strings?.plural} count`}
        variant="tertiary"
        isIcon
        className={twMerge(
          'flex items-center gap-1',
          count > 0 ? 'text-secondary' : 'text-disabled'
        )}
      >
        <Icon className="size-4" />
        {count}
      </Button>
      <Tooltip>{tooltipText}</Tooltip>
    </TooltipTrigger>
  )
}

function AlertsSummaryCellContent({ alerts }: { alerts: Alert[] }) {
  const { malicious, secrets, pii } = countAlerts(alerts)

  return (
    <div className="flex items-center gap-2">
      <AlertsSummaryCount
        strings={{
          singular: 'malicious package',
          plural: 'malicious packages',
        }}
        count={malicious}
        icon={PackageX}
      />
      <AlertsSummaryCount
        strings={{
          singular: 'secret',
          plural: 'secrets',
        }}
        count={secrets}
        icon={Key01}
      />
      <AlertsSummaryCount
        strings={{
          singular: 'personally identifiable information (PII)',
          plural: 'personally identifiable information (PII)',
        }}
        count={pii}
        icon={User01}
      />
    </div>
  )
}

function CellRenderer({
  column,
  row,
}: {
  column: TableMessagesColumn
  row: Conversation
}) {
  switch (column.id) {
    case 'time':
      return (
        <span className="whitespace-nowrap text-secondary">
          {formatTime(new Date(row.conversation_timestamp))}
        </span>
      )
    case 'type':
      return getTypeText(row.type)
    case 'prompt':
      return getPromptText(row)
    case 'alerts':
      return <AlertsSummaryCellContent alerts={row.alerts ?? []} />
    case 'token_usage':
      return <TableAlertTokenUsage usage={row.token_usage_agg} />

    default:
      return column.id satisfies never
  }
}

export function TableMessages() {
  const { data: response, isError } = useQueryGetWorkspaceMessagesTable()

  return (
    <>
      <ResizableTableContainer>
        <Table data-testid="messages-table" aria-label="Alerts table">
          <TableHeader columns={TABLE_MESSAGES_COLUMNS}>
            {(column) => <Column {...column} id={column.id} />}
          </TableHeader>
          <TableBody
            renderEmptyState={() => {
              if (isError) return <EmptyStateError />

              return <TableMessagesEmptyState />
            }}
            items={response?.data}
          >
            {(row) => (
              <Row
                columns={TABLE_MESSAGES_COLUMNS}
                id={row.chat_id}
                href={hrefs.prompt(row.chat_id)}
                data-timestamp={row.conversation_timestamp}
              >
                {(column) => (
                  <Cell
                    className="h-5 truncate py-1 group-last/row:border-b-0"
                    alignment={column.alignment}
                    id={column.id}
                  >
                    <CellRenderer column={column} row={row} />
                  </Cell>
                )}
              </Row>
            )}
          </TableBody>
        </Table>
      </ResizableTableContainer>

      <TableMessagesPagination />
    </>
  )
}
