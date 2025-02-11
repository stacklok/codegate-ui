import { test, expect } from "vitest";
import { isAlertMalicious } from "../../../../lib/is-alert-malicious";
import { mockAlert } from "../../../../mocks/msw/mockers/alert.mock";

test("matches malicious alert", () => {
  expect(isAlertMalicious(mockAlert({ type: "malicious" }))).toBe(true);
});

test("doesn't match secret", () => {
  expect(isAlertMalicious(mockAlert({ type: "secret" }))).toBe(false);
});
