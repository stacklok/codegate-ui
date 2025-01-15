import { http, HttpResponse } from "msw";
import mockedPrompts from "@/mocks/msw/fixtures/GET_MESSAGES.json";
import mockedAlerts from "@/mocks/msw/fixtures/GET_ALERTS.json";

export const handlers = [
  http.get("*/health", () => HttpResponse.json({ status: "healthy" })),
  http.get("*/dashboard/messages", () => {
    return HttpResponse.json(mockedPrompts);
  }),
  http.get("*/dashboard/alerts", () => {
    return HttpResponse.json(mockedAlerts);
  }),
];
