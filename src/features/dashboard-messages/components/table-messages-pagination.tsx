import { Button } from '@stacklok/ui-kit'
import { useMessagesFilterSearchParams } from '../hooks/use-messages-filter-search-params'
import { useQueryGetWorkspaceMessagesTable } from '../hooks/use-query-get-workspace-messages-table'
import { ArrowLeft, ArrowRight } from '@untitled-ui/icons-react'

export function TableMessagesPagination() {
  const { state, goToPrevPage, goToNextPage, setPage } =
    useMessagesFilterSearchParams()

  const { data } = useQueryGetWorkspaceMessagesTable()

  const hasNextPage: boolean = data
    ? data.offset + data.limit < data.total
    : false
  const hasPreviousPage: boolean = data ? data.offset > 0 : false

  const numButtons = Math.ceil((data?.total ?? 0) / (data?.limit ?? 0))

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex gap-2">
        <Button
          isIcon
          variant="secondary"
          isDisabled={!hasPreviousPage}
          onPress={goToPrevPage}
          aria-label="Previous"
        >
          <ArrowLeft />
        </Button>

        {Array.from({
          length: numButtons,
        }).map((_, i) => (
          <Button
            isIcon
            key={i}
            onPress={() => setPage(i + 1)}
            variant={i + 1 === state.page ? 'primary' : 'secondary'}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          isIcon
          variant="secondary"
          isDisabled={!hasNextPage}
          onPress={goToNextPage}
          aria-label="Next"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
