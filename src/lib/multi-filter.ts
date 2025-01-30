/**
 * Utility function for chaining multiple predicates when filtering an array,
 * avoiding iterating over an array more than once. Intended to aid in composing
 * filtering behavior, particularly when querying data from the server with react-query.
 *
 * Not intended to be used to chain filters together, but rather to apply
 * multiple filter criteria to an array in a single pass.
 *
 * @example
 * const data = [0,1,2,3,4,5]
 * const result = multiFilter(data, [(d) => !!d, (d) => d > 3])
 */
export function multiFilter<T>(
  array: T[] | undefined,
  predicates: ((i: T) => boolean)[],
): T[] {
  if (!array) return [];

  return array.filter((i) => predicates.every((p) => p(i) === true));
}
