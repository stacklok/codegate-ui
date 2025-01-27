import { test, expect } from "vitest";
import { ALERT_MALICIOUS } from "../../mocks/alert-malicious.mock";
import { ALERT_SECRET } from "../../mocks/alert-secret.mock";
import { isAlertSecret } from "../is-alert-secret";

test("matches secret alert", () => {
  expect(isAlertSecret(ALERT_SECRET)).toBe(true);
});

test("doesn't match malicious", () => {
  expect(isAlertSecret(ALERT_MALICIOUS)).toBe(false);
});
