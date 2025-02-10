// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepEquals = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEquals(a[key], b[key])) return false;
  }

  return true;
};

export const dedupeByKeys = <T extends Record<string, unknown>>(
  items: (T | null | undefined)[],
  keys: (keyof T)[],
) =>
  items.filter(Boolean).reduce((acc, curr) => {
    const alreadySeen = acc.some((item) =>
      keys.some((key) => {
        if (typeof item[key] === "string") return item[key] === curr?.[key];
        if (typeof item[key] === "object")
          return deepEquals(item[key], curr?.[key]);
      }),
    );
    if (!alreadySeen && curr) {
      acc.push(curr);
    }
    return acc;
  }, [] as T[]);
