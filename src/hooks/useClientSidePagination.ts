export function useClientSidePagination<T>(
  data: T[],
  page: number,
  pageSize: number,
) {
  const pageStart = page * pageSize;
  const pageEnd = page * pageSize + pageSize - 1;

  const dataView = data.slice(pageStart, pageEnd);

  const hasPreviousPage = page > 0;
  const hasNextPage = pageEnd + 1 < data.length;

  return { pageStart, pageEnd, dataView, hasPreviousPage, hasNextPage };
}
