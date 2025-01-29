import { test, expect } from "vitest";
import { isAlertMalicious } from "../is-alert-malicious";
import { ALERT_MALICIOUS } from "../../mocks/alert-malicious.mock";
import { ALERT_SECRET } from "../../mocks/alert-secret.mock";

test("matches malicious alert", () => {
  expect(isAlertMalicious(ALERT_MALICIOUS)).toBe(true);
});

test("doesn't match secret", () => {
  expect(isAlertMalicious(ALERT_SECRET)).toBe(false);
});
