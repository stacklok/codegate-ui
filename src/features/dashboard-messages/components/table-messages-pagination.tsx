import { Button } from '@stacklok/ui-kit'
import { useMessagesFilterSearchParams } from '../hooks/use-messages-filter-search-params'
import { useQueryGetWorkspaceMessagesTable } from '../hooks/use-query-get-workspace-messages-table'
import {
  ChevronLeft,
  ChevronLeftDouble,
  ChevronRight,
  ChevronRightDouble,
} from '@untitled-ui/icons-react'

export function TableMessagesPagination() {
  const { state, goToPrevPage, goToNextPage, setPage } =
    useMessagesFilterSearchParams()

  const { data } = useQueryGetWorkspaceMessagesTable()

  const totalRecords: number = data?.total ?? 0
  const totalPages: number = Math.ceil(totalRecords / (data?.limit ?? 1))

  // We only show pagination when there is something to paginate :)
  if (totalPages < 2) return null

  const hasNextPage: boolean = data
    ? data.offset + data.limit < totalRecords
    : false
  const hasPreviousPage: boolean = data ? data.offset > 0 : false

  // A sliding window of page numbers to render as clickable buttons
  // e.g. if the page number is `7`, the pages shown should be `[5, 6, 7, 8, 9]`
  // e.g. if the page number is `1`, the pages shown should be `[1, 2, 3, 4, 5]`
  const pageNumsToShow = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => {
      const startPage = Math.max(1, Math.min(state.page - 2, totalPages - 4))
      return startPage + i
    }
  )

  return (
    <div className="flex w-full justify-center px-4 py-2">
      <div className="flex gap-2">
        <Button
          className="size-8"
          isIcon
          variant="secondary"
          isDisabled={totalPages < 2 || state.page === 1}
          onPress={() => setPage(1)}
          aria-label="First"
        >
          <ChevronLeftDouble />
        </Button>
        <Button
          className="size-8"
          isIcon
          variant="secondary"
          isDisabled={!hasPreviousPage}
          onPress={goToPrevPage}
          aria-label="Previous"
        >
          <ChevronLeft />
        </Button>

        {pageNumsToShow.map((pageNum) => (
          <Button
            className="size-8"
            isIcon
            key={pageNum}
            onPress={() => setPage(pageNum)}
            variant={pageNum === state.page ? 'primary' : 'secondary'}
          >
            {pageNum}
          </Button>
        ))}

        <Button
          className="size-8"
          isIcon
          variant="secondary"
          isDisabled={!hasNextPage}
          onPress={goToNextPage}
          aria-label="Next"
        >
          <ChevronRight />
        </Button>
        <Button
          className="size-8"
          isIcon
          variant="secondary"
          isDisabled={totalPages < 2 || state.page === totalPages}
          onPress={() => setPage(totalPages)}
          aria-label="Last"
        >
          <ChevronRightDouble />
        </Button>
      </div>
    </div>
  )
}
