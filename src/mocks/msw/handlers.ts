import { http, HttpResponse } from "msw";
import mockedAlerts from "@/mocks/msw/fixtures/GET_ALERTS.json";
import mockedWorkspaces from "@/mocks/msw/fixtures/GET_WORKSPACES.json";
import mockedProviders from "@/mocks/msw/fixtures/GET_PROVIDERS.json";
import mockedProvidersModels from "@/mocks/msw/fixtures/GET_PROVIDERS_MODELS.json";
import { ProviderType } from "@/api/generated";
import { mockConversation } from "./mockers/conversation.mock";
import { mswEndpoint } from "@/test/msw-endpoint";

export const handlers = [
  http.get(mswEndpoint("/health"), () =>
    HttpResponse.json({
      current_version: "foo",
      latest_version: "bar",
      is_latest: false,
      error: null,
    }),
  ),
  http.get(mswEndpoint("/api/v1/version"), () =>
    HttpResponse.json({ status: "healthy" }),
  ),
  http.get(mswEndpoint("/api/v1/workspaces/active"), () =>
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
  http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/messages"), () => {
    return HttpResponse.json(
      Array.from({ length: 10 }).map(() => mockConversation()),
    );
  }),
  http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/alerts"), () => {
    return HttpResponse.json(mockedAlerts);
  }),
  http.get(mswEndpoint("/api/v1/workspaces"), () => {
    return HttpResponse.json(mockedWorkspaces);
  }),
  http.get(mswEndpoint("/api/v1/workspaces/archive"), () => {
    return HttpResponse.json({
      workspaces: [
        {
          name: "archived_workspace",
          is_active: false,
        },
      ],
    });
  }),
  http.post(mswEndpoint("/api/v1/workspaces"), () => {
    return HttpResponse.json(mockedWorkspaces);
  }),
  http.post(
    mswEndpoint("/api/v1/workspaces/active"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.post(
    mswEndpoint("/api/v1/workspaces/archive/:workspace_name/recover"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.delete(
    mswEndpoint("/api/v1/workspaces/:workspace_name"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.delete(
    mswEndpoint("/api/v1/workspaces/archive/:workspace_name"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get(
    mswEndpoint("/api/v1/workspaces/:workspace_name/custom-instructions"),
    () => {
      return HttpResponse.json({ prompt: "foo" });
    },
  ),
  http.get(
    mswEndpoint("/api/v1/workspaces/:workspace_name/token-usage"),
    () => {
      return HttpResponse.json({
        tokens_by_model: {
          "claude-3-5-sonnet-latest": {
            provider_type: ProviderType.ANTHROPIC,
            model: "claude-3-5-sonnet-latest",
            token_usage: {
              input_tokens: 1183,
              output_tokens: 433,
              input_cost: 0.003549,
              output_cost: 0.006495,
            },
          },
        },
        token_usage: {
          input_tokens: 1183,
          output_tokens: 433,
          input_cost: 0.003549,
          output_cost: 0.006495,
        },
      });
    },
  ),
  http.put(
    mswEndpoint("/api/v1/workspaces/:workspace_name/custom-instructions"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/muxes"), () =>
    HttpResponse.json([
      {
        provider_id: "openai",
        model: "gpt-3.5-turbo",
        matcher_type: "file_regex",
        matcher: ".*\\.txt",
      },
      {
        provider_id: "anthropic",
        model: "davinci",
        matcher_type: "catch_all",
      },
    ]),
  ),
  http.put(
    mswEndpoint("/api/v1/workspaces/:workspace_name/muxes"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get(mswEndpoint("/api/v1/provider-endpoints/:provider_id/models"), () =>
    HttpResponse.json(mockedProvidersModels),
  ),
  http.get(mswEndpoint("/api/v1/provider-endpoints/models"), () =>
    HttpResponse.json(mockedProvidersModels),
  ),
  http.get(mswEndpoint("/api/v1/provider-endpoints/:provider_id"), () =>
    HttpResponse.json(mockedProviders[0]),
  ),
  http.get(mswEndpoint("/api/v1/provider-endpoints"), () =>
    HttpResponse.json(mockedProviders),
  ),
  http.post(
    mswEndpoint("/api/v1/provider-endpoints"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.put(
    mswEndpoint("/api/v1/provider-endpoints"),
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.delete(
    mswEndpoint("/api/v1/provider-endpoints"),
    () => new HttpResponse(null, { status: 204 }),
  ),
];
