export function useClientSidePagination<T>(
  data: T[],
  page: number,
  pageSize: number
) {
  const pageStart = page * pageSize
  const pageEnd = page * pageSize + pageSize

  const dataView = data.slice(pageStart, pageEnd)

  const hasPreviousPage = page > 0
  const hasNextPage = pageEnd < data.length

  return { pageStart, pageEnd, dataView, hasPreviousPage, hasNextPage }
}
