import { http, HttpResponse } from "msw";
import mockedPrompts from "@/mocks/msw/fixtures/GetMessages.json";
import mockedAlerts from "@/mocks/msw/fixtures/GetAlerts.json";

export const handlers = [
  http.get("*/dashboard/messages", () => {
    return HttpResponse.json(mockedPrompts);
  }),
  http.get("*/dashboard/alerts", () => {
    return HttpResponse.json(mockedAlerts);
  }),
];
