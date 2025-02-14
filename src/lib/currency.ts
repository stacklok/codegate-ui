type Currency = ("GBP" | "USD" | "EUR" | "AED" | "JOD") & string;

type FormatCurrencyOptions = {
  currency: Currency;
  from_minor?: boolean;
  region?: string | string[] | undefined;
  to_minor?: boolean;
};

const getCurrencyFormatOptions = (currency: Currency) => {
  return new Intl.NumberFormat(undefined, {
    currency: currency,
    currencyDisplay: "code",
    style: "currency",
  }).resolvedOptions();
};

export function formatCurrency(
  number: number,
  {
    currency = "GBP",
    from_minor,
    region = "en-US",
    to_minor,
  }: FormatCurrencyOptions,
): string {
  if (from_minor) {
    return new Intl.NumberFormat(
      region,
      getCurrencyFormatOptions(currency),
    ).format(convertCurrencyFromMinor(number, currency));
  }

  if (to_minor) {
    return new Intl.NumberFormat(
      region,
      getCurrencyFormatOptions(currency),
    ).format(convertCurrencyToMinor(number, currency));
  }

  return new Intl.NumberFormat(
    region,
    getCurrencyFormatOptions(currency),
  ).format(number);
}

const getDigits = (currency: Currency): number => {
  const digits = new Intl.NumberFormat(undefined, {
    currency,
    style: "currency",
  }).resolvedOptions().maximumFractionDigits;
  if (digits === undefined)
    throw Error(
      `[currency/getDigits] Unable to get digits for currency ${currency}`,
    );

  return digits;
};

export function convertCurrencyToMinor(
  amount: number,
  currency: Currency,
): number {
  return Math.round(amount * 10 ** getDigits(currency));
}

export function convertCurrencyFromMinor(
  amount: number,
  currency: Currency,
): number {
  return amount / 10 ** getDigits(currency);
}
