import { convertCurrencyToMinor, convertCurrencyFromMinor } from "../currency";

it("convertCurrencyToMinor", () => {
  expect(convertCurrencyToMinor(1, "AED")).toBe(100);
  expect(convertCurrencyToMinor(1, "JOD")).toBe(1000);

  expect(convertCurrencyToMinor(1.0, "AED")).toBe(100);
  expect(convertCurrencyToMinor(1.0, "JOD")).toBe(1000);

  expect(convertCurrencyToMinor(1.11, "AED")).toBe(111);
  expect(convertCurrencyToMinor(1.11, "JOD")).toBe(1110);

  expect(convertCurrencyToMinor(1.1111, "AED")).toBe(111);
  expect(convertCurrencyToMinor(1.1111, "JOD")).toBe(1111);

  expect(convertCurrencyToMinor(10.0, "AED")).toBe(1000);
  expect(convertCurrencyToMinor(1.0, "JOD")).toBe(1000);

  expect(convertCurrencyToMinor(420.69, "AED")).toBe(42069);
  expect(convertCurrencyToMinor(42.069, "JOD")).toBe(42069);
});

it("convertCurrencyFromMinor", () => {
  expect(convertCurrencyFromMinor(100, "AED")).toBe(1);
  expect(convertCurrencyFromMinor(100, "JOD")).toBe(0.1);
  expect(convertCurrencyFromMinor(42069, "AED")).toBe(420.69);
  expect(convertCurrencyFromMinor(42069, "JOD")).toBe(42.069);
  expect(convertCurrencyFromMinor(42690, "AED")).toBe(426.9);
  expect(convertCurrencyFromMinor(42690, "JOD")).toBe(42.69);
});
