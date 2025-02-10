import { render } from "@/lib/test-utils";
import { screen, waitFor, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { server } from "@/mocks/msw/node";
import { HttpResponse, http } from "msw";
import userEvent from "@testing-library/user-event";
import { RouteDashboard } from "../route-dashboard";
import { mswEndpoint } from "@/test/msw-endpoint";

import { mockConversation } from "@/mocks/msw/mockers/conversation.mock";
import { faker } from "@faker-js/faker";

it("should mount alert summaries", async () => {
  render(<RouteDashboard />);

  expect(
    screen.getByRole("heading", { name: /workspace token usage/i })
  ).toBeVisible();

  expect(
    screen.getByRole("heading", { name: /secrets redacted/i })
  ).toBeVisible();

  expect(
    screen.getByRole("heading", { name: /malicious packages/i })
  ).toBeVisible();
});

it("should render messages table", async () => {
  render(<RouteDashboard />);

  expect(
    screen.getByRole("grid", {
      name: /alerts table/i,
    })
  ).toBeVisible();
});

it("shows only conversations with secrets when you click on the secrets tab", async () => {
  server.use(
    http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/messages"), () => {
      return HttpResponse.json([
        ...Array.from({ length: 10 }).map(() =>
          mockConversation({
            alertsConfig: { numAlerts: 10, type: "malicious" },
          })
        ),
        ...Array.from({ length: 10 }).map(() =>
          mockConversation({
            alertsConfig: { numAlerts: 10, type: "secret" },
          })
        ),
      ]);
    })
  );
  render(<RouteDashboard />);

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  expect(screen.getByTestId(/tab-all-count/i)).toHaveTextContent("20");
  expect(screen.getByTestId(/tab-secrets-count/i)).toHaveTextContent("10");

  await userEvent.click(
    screen.getByRole("tab", {
      name: /secrets/i,
    })
  );

  const tbody = screen.getAllByRole("rowgroup")[1] as HTMLElement;

  await waitFor(() => {
    const secretsCountButtons = within(tbody).getAllByRole("button", {
      name: /secrets count/,
    }) as HTMLElement[];
    secretsCountButtons.forEach((e) => {
      expect(e).toHaveTextContent("10");
    });
  });
});

it("shows only conversations with malicious when you click on the malicious tab", async () => {
  server.use(
    http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/messages"), () => {
      return HttpResponse.json([
        ...Array.from({ length: 10 }).map(() =>
          mockConversation({
            alertsConfig: { numAlerts: 10, type: "malicious" },
          })
        ),
        ...Array.from({ length: 10 }).map(() =>
          mockConversation({
            alertsConfig: { numAlerts: 10, type: "secret" },
          })
        ),
      ]);
    })
  );
  render(<RouteDashboard />);

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  expect(screen.getByTestId(/tab-all-count/i)).toHaveTextContent("20");
  expect(screen.getByTestId(/tab-malicious-count/i)).toHaveTextContent("10");

  await userEvent.click(
    screen.getByRole("tab", {
      name: /malicious/i,
    })
  );

  const tbody = screen.getAllByRole("rowgroup")[1] as HTMLElement;

  await waitFor(() => {
    const secretsCountButtons = within(tbody).getAllByRole("button", {
      name: /malicious packages count/,
    }) as HTMLElement[];
    secretsCountButtons.forEach((e) => {
      expect(e).toHaveTextContent("10");
    });
  });
});

it("should render searchbox", async () => {
  render(<RouteDashboard />);

  expect(
    screen.getByRole("searchbox", {
      name: /search messages/i,
    })
  ).toBeVisible();
});

it("can filter using searchbox", async () => {
  const STRING_TO_FILTER_BY = "foo-bar-my-awesome-string.com";

  // mock a conversation to filter to
  // - replace the message with our search string
  // - timestamp very far in the past, so it is sorted to end of list
  const CONVERSATION_TO_FILTER_BY = mockConversation();
  (CONVERSATION_TO_FILTER_BY.question_answers[0].question.message as string) =
    STRING_TO_FILTER_BY;
  (CONVERSATION_TO_FILTER_BY.conversation_timestamp as string) = faker.date
    .past({ years: 1 })
    .toISOString();

  server.use(
    http.get(mswEndpoint("/api/v1/workspaces/:workspace_name/messages"), () => {
      return HttpResponse.json([
        ...Array.from({ length: 15 }).map(() => mockConversation()), // at least 1 page worth of data
        CONVERSATION_TO_FILTER_BY,
      ]);
    })
  );
  render(<RouteDashboard />);

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  expect(screen.queryByText(STRING_TO_FILTER_BY)).not.toBeInTheDocument();

  await userEvent.type(
    screen.getByRole("searchbox", { name: /search messages/i }),
    STRING_TO_FILTER_BY
  );

  expect(
    within(screen.getByRole("grid")).queryByText(STRING_TO_FILTER_BY)
  ).toBeVisible();
});

it("should sort messages by date desc", async () => {
  render(<RouteDashboard />);

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  const tbody = screen.getAllByRole("rowgroup")[1] as HTMLElement;

  const newest = (
    within(tbody).getAllByRole("row")[1] as HTMLElement
  ).getAttribute("data-timestamp") as string;
  const oldest = (
    within(tbody).getAllByRole("row")[2] as HTMLElement
  ).getAttribute("data-timestamp") as string;

  expect(oldest > newest).toBe(false);
});
