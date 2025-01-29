import { test, expect } from "vitest";
import { isAlertSecret } from "../is-alert-secret";
import { makeMockAlert } from "../../mocks/alert.mock";

test("matches secret alert", () => {
  expect(isAlertSecret(makeMockAlert({ type: "secret" }))).toBe(true);
});

test("doesn't match malicious", () => {
  expect(isAlertSecret(makeMockAlert({ type: "malicious" }))).toBe(false);
});
