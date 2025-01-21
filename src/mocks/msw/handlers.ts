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
  http.get("*/api/v1/dashboard/version", () =>
    HttpResponse.json({ status: "healthy" }),
  ),
  http.get("*/api/v1/workspaces/active", () =>
    HttpResponse.json([
      {
        name: "my-awesome-workspace",
        is_active: true,
        last_updated: new Date(Date.now()).toISOString(),
      },
    ]),
  ),
  http.get("*/api/v1/workspaces/:name/messages", () => {
    return HttpResponse.json(mockedPrompts);
  }),
  http.get("*/api/v1/workspaces/:name/alerts", () => {
    return HttpResponse.json(mockedAlerts);
  }),
  http.get("*/api/v1/workspaces", () => {
    return HttpResponse.json(mockedWorkspaces);
  }),
  http.get("*/api/v1/workspaces/archive", () => {
    return HttpResponse.json({
      workspaces: [
        {
          name: "archived_workspace",
          is_active: false,
        },
      ],
    });
  }),
  http.post("*/api/v1/workspaces", () => {
    return HttpResponse.json(mockedWorkspaces);
  }),
  http.post("*/api/v1/workspaces/archive/:workspace_name/recover", () => {
    HttpResponse.json({ status: 204 });
  }),
  http.delete("*/api/v1/workspaces/:name", () =>
    HttpResponse.json({ status: 204 }),
  ),
  http.get("*/api/v1/workspaces/:name/system-prompt", () => {
    return HttpResponse.json({ prompt: "foo" });
  }),
  http.put("*/api/v1/workspaces/:name/system-prompt", () => {
    return HttpResponse.json({}, { status: 204 });
  }),
];
