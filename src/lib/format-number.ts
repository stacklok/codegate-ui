export const formatNumberCompact = (value: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(value);
};
