import { test, expect } from "vitest";
import { isAlertConversationMalicious } from "../is-alert-malicious";
import { makeMockAlert } from "../../mocks/alert.mock";

test("matches malicious alert", () => {
  expect(
    isAlertConversationMalicious(makeMockAlert({ type: "malicious" })),
  ).toBe(true);
});

test("doesn't match secret", () => {
  expect(isAlertConversationMalicious(makeMockAlert({ type: "secret" }))).toBe(
    false,
  );
});
