import { test, expect } from "vitest";
import { isAlertConversationSecret } from "../is-alert-secret";
import { makeMockAlert } from "../../mocks/alert.mock";

test("matches secret alert", () => {
  expect(isAlertConversationSecret(makeMockAlert({ type: "secret" }))).toBe(
    true,
  );
});

test("doesn't match malicious", () => {
  expect(isAlertConversationSecret(makeMockAlert({ type: "malicious" }))).toBe(
    false,
  );
});
