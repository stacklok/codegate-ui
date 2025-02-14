import {
  DefinedUseQueryResult,
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
  QueryObserverPendingResult,
  QueryObserverRefetchErrorResult,
} from '@tanstack/react-query'

export type QueryResult<T> =
  | DefinedUseQueryResult<T, Error>
  | QueryObserverLoadingErrorResult<T, Error>
  | QueryObserverLoadingResult<T, Error>
  | QueryObserverPendingResult<T, Error>
  | QueryObserverRefetchErrorResult<T, Error>
