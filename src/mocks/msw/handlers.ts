import { http, HttpResponse } from "msw";
import mockedPrompts from "@/mocks/msw/fixtures/GET_MESSAGES.json";
import mockedAlerts from "@/mocks/msw/fixtures/GET_ALERTS.json";
import mockedWorkspaces from "@/mocks/msw/fixtures/GET_WORKSPACES.json";
import mockedProviders from "@/mocks/msw/fixtures/GET_PROVIDERS.json";

export const handlers = [
  http.get("*/health", () =>
    HttpResponse.json({
      current_version: "foo",
      latest_version: "bar",
      is_latest: false,
      error: null,
    }),
  ),
  http.get("*/api/v1/version", () => HttpResponse.json({ status: "healthy" })),
  http.get("*/api/v1/workspaces/active", () =>
    HttpResponse.json({
      workspaces: [
        {
          name: "my-awesome-workspace",
          is_active: true,
          last_updated: new Date(Date.now()).toISOString(),
        },
      ],
    }),
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
  http.post(
    "*/api/v1/workspaces/active",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.post(
    "*/api/v1/workspaces/archive/:workspace_name/recover",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.delete(
    "*/api/v1/workspaces/:name",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.delete(
    "*/api/v1/workspaces/archive/:name",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get("*/api/v1/workspaces/:name/custom-instructions", () => {
    return HttpResponse.json({ prompt: "foo" });
  }),
  http.put(
    "*/api/v1/workspaces/:name/custom-instructions",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get("*/api/v1/workspaces/:workspace_name/muxes", () =>
    HttpResponse.json([
      {
        provider: "openai",
        model: "gpt-3.5-turbo",
        matcher_type: "file_regex",
        matcher: ".*\\.txt",
      },
      {
        provider: "anthropic",
        model: "davinci",
        matcher_type: "catch_all",
      },
    ]),
  ),
  http.put(
    "*/api/v1/workspaces/:workspace_name/muxes",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get("*/api/v1/provider-endpoints", () =>
    HttpResponse.json(mockedProviders),
  ),
  http.get("*/api/v1/provider-endpoints/:provider_id", () =>
    HttpResponse.json(mockedProviders[0]),
  ),
  http.post(
    "*/api/v1/provider-endpoints",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.put(
    "*/api/v1/provider-endpoints",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.delete(
    "*/api/v1/provider-endpoints",
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get("*/api/v1/provider-endpoints/:provider_name/models", () =>
    HttpResponse.json([
      { name: "claude-3.5", provider: "anthropic" },
      { name: "claude-3.6", provider: "anthropic" },
      { name: "claude-3.7", provider: "anthropic" },
      { name: "chatgpt-4o", provider: "openai" },
      { name: "chatgpt-4p", provider: "openai" },
    ]),
  ),
  http.get("*/api/v1/provider-endpoints/models", () =>
    HttpResponse.json([
      { name: "claude-3.5", provider: "anthropic" },
      { name: "claude-3.6", provider: "anthropic" },
      { name: "claude-3.7", provider: "anthropic" },
      { name: "chatgpt-4o", provider: "openai" },
      { name: "chatgpt-4p", provider: "openai" },
    ]),
  ),
];
