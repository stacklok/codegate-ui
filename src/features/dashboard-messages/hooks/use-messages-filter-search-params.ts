import { AlertTriggerType } from '@/api/generated'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const alertsFilterSchema = z.object({
  search: z.string().optional(),
  view: z.nativeEnum(AlertTriggerType).nullable().default(null),
  page: z.coerce
    .number()
    .optional()
    .default(1)
    .transform((v) => (v < 1 ? 1 : v)),
})

type AlertsFilterSchema = z.input<typeof alertsFilterSchema>

const DEFAULT_FILTER = {} as const satisfies AlertsFilterSchema

export const useMessagesFilterSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(DEFAULT_FILTER)
  )

  const setView = useCallback(
    (view: AlertTriggerType | undefined) => {
      setSearchParams((prev) => {
        if (view) prev.set('view', view)
        if (!view) prev.delete('view')

        prev.delete('page')
        return prev
      })
    },
    [setSearchParams]
  )

  const setSearch = useCallback(
    (query: string | null) => {
      setSearchParams((prev) => {
        if (query !== null && query !== '') {
          prev.set('search', query)
          prev.delete('page')
        } else {
          prev.delete('search')
        }
        return prev
      })
    },
    [setSearchParams]
  )

  const goToNextPage = useCallback(() => {
    setSearchParams((prev) => {
      const page = Number(prev.get('page') ?? 0)
      prev.set('page', Math.max(page + 1, 1).toString())
      return prev
    })
  }, [setSearchParams])

  const goToPrevPage = useCallback(() => {
    setSearchParams((prev) => {
      const page = Number(prev.get('page') ?? 0)
      prev.set('page', Math.max(page - 1, 1).toString())
      return prev
    })
  }, [setSearchParams])

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set('page', Math.max(page, 1).toString())
        return prev
      })
    },
    [setSearchParams]
  )

  const state = alertsFilterSchema.parse(Object.fromEntries(searchParams))

  return {
    state,
    setView,
    setSearch,
    goToNextPage,
    goToPrevPage,
    setPage,
  }
}
