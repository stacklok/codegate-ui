import { test, expect } from "vitest";
import { isAlertMalicious } from "../is-alert-malicious";
import { makeMockAlert } from "../../mocks/alert.mock";

test("matches malicious alert", () => {
  expect(isAlertMalicious(makeMockAlert({ type: "malicious" }))).toBe(true);
});

test("doesn't match secret", () => {
  expect(isAlertMalicious(makeMockAlert({ type: "secret" }))).toBe(false);
});
