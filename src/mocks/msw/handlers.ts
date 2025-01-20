import { http, HttpResponse } from "msw";
import mockedPrompts from "@/mocks/msw/fixtures/GET_MESSAGES.json";
import mockedAlerts from "@/mocks/msw/fixtures/GET_ALERTS.json";
import mockedWorkspaces from "@/mocks/msw/fixtures/GET_WORKSPACES.json";

export const handlers = [
  http.get("*/health", () =>
    HttpResponse.json({
      current_version: "foo",
      latest_version: "bar",
      is_latest: false,
      error: null,
    }),
  ),
  http.get("*/dashboard/version", () =>
    HttpResponse.json({ status: "healthy" }),
  ),
  http.get("*/dashboard/messages", () => {
    return HttpResponse.json(mockedPrompts);
  }),
  http.get("*/dashboard/alerts", () => {
    return HttpResponse.json(mockedAlerts);
  }),
  http.get("*/workspaces", () => {
    return HttpResponse.json(mockedWorkspaces);
  }),
];
