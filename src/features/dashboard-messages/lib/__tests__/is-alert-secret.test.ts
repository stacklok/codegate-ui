import { test, expect } from "vitest";
import { isAlertSecret } from "../../../../lib/is-alert-secret";
import { mockAlert } from "../../../../mocks/msw/mockers/alert.mock";

test("matches secret alert", () => {
  expect(isAlertSecret(mockAlert({ type: "secret" }))).toBe(true);
});

test("doesn't match malicious", () => {
  expect(isAlertSecret(mockAlert({ type: "malicious" }))).toBe(false);
});
