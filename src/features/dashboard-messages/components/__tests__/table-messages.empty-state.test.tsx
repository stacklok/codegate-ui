import { test } from "vitest";
import { render, waitFor } from "@/lib/test-utils";
import { server } from "@/mocks/msw/node";
import { emptyStateStrings } from "../../constants/strings";
import { useSearchParams } from "react-router-dom";
import { delay, http, HttpHandler, HttpResponse } from "msw";
import { mockAlert } from "../../../../mocks/msw/mockers/alert.mock";
import { AlertsFilterView } from "../../hooks/use-messages-filter-search-params";
import { TableMessages } from "../table-messages";
import { hrefs } from "@/lib/hrefs";
import { mswEndpoint } from "@/test/msw-endpoint";

enum IllustrationTestId {
  ALERT = "illustration-alert",
  DONE = "illustration-done",
  DRAG_AND_DROP = "illustration-drag-and-drop",
  LOADER = "illustration-loader",
  NO_SEARCH_RESULTS = "illustration-no-search-results",
}

type TestCaseAction =
  | {
      role: "button";
      name: string;
      href?: never;
    }
  | {
      role: "link";
      name: string;
      href: string;
    };

type TestCase = {
  testDescription: string;
  handlers: HttpHandler[];
  searchParams: {
    view: AlertsFilterView;
    search: string | null;
  };
  expected: {
    title: string;
    body: string;
    illustrationTestId: IllustrationTestId;
    actions: TestCaseAction[] | null;
  };
};

vi.mock("react-router-dom", async () => {
  const original =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...original,
    useSearchParams: vi.fn(() => [new URLSearchParams({}), () => {}]),
  };
});

vi.mock("@stacklok/ui-kit", async () => {
  const original =
    await vi.importActual<typeof import("@stacklok/ui-kit")>(
      "@stacklok/ui-kit"
    );
  return {
    ...original,
    IllustrationDone: () => <div data-testid={IllustrationTestId.DONE} />,
    IllustrationDragAndDrop: () => (
      <div data-testid={IllustrationTestId.DRAG_AND_DROP} />
    ),
    IllustrationAlert: () => <div data-testid={IllustrationTestId.ALERT} />,
    IllustrationNoSearchResults: () => (
      <div data-testid={IllustrationTestId.NO_SEARCH_RESULTS} />
    ),
    Loader: () => <div data-testid={IllustrationTestId.LOADER} />,
  };
});

const TEST_CASES: TestCase[] = [
  {
    testDescription: "Loading state",
    handlers: [
      http.get(mswEndpoint("/api/v1/workspaces"), () => {
        delay("infinite");
      }),
    ],
    searchParams: {
      search: null,
      view: AlertsFilterView.ALL,
    },
    expected: {
      title: emptyStateStrings.title.loading,
      body: emptyStateStrings.body.loading,
      illustrationTestId: IllustrationTestId.LOADER,
      actions: null,
    },
  },
  {
    testDescription: "Only 1 workspace, no alerts",
    handlers: [
      http.get(mswEndpoint("/api/v1/workspaces"), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: "default",
              is_active: true,
            },
          ],
        });
      }),
      http.get(mswEndpoint("/api/v1/workspaces/archive"), () => {
        return HttpResponse.json({
          workspaces: [],
        });
      }),
      http.get(
        mswEndpoint("/api/v1/workspaces/:workspace_name/messages"),
        () => {
          return HttpResponse.json([]);
        }
      ),
    ],
    searchParams: {
      search: null,
      view: AlertsFilterView.ALL,
    },
    expected: {
      body: emptyStateStrings.body.getStartedDesc,
      title: emptyStateStrings.title.getStarted,
      illustrationTestId: IllustrationTestId.DRAG_AND_DROP,
      actions: [
        {
          role: "link",
          name: "CodeGate docs",
          href: hrefs.external.docs.home,
        },
      ],
    },
  },
  {
    testDescription: "No search results",
    handlers: [
      http.get(mswEndpoint("/api/v1/workspaces"), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: "default",
              is_active: true,
            },
          ],
        });
      }),
      http.get(mswEndpoint("/api/v1/workspaces/archive"), () => {
        return HttpResponse.json({
          workspaces: [],
        });
      }),
      http.get(
        mswEndpoint("/api/v1/workspaces/:workspace_name/messages"),
        () => {
          return HttpResponse.json(
            Array.from({ length: 10 }, () => mockAlert({ type: "malicious" }))
          );
        }
      ),
    ],
    searchParams: { search: "foo-bar", view: AlertsFilterView.ALL },
    expected: {
      title: emptyStateStrings.title.noSearchResultsFor("foo-bar"),
      body: emptyStateStrings.body.tryChangingSearch,
      illustrationTestId: IllustrationTestId.NO_SEARCH_RESULTS,
      actions: [
        {
          role: "button",
          name: "Clear search",
        },
      ],
    },
  },
  {
    testDescription: "No alerts, multiple workspaces",
    handlers: [
      http.get(mswEndpoint("/api/v1/workspaces"), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: "default",
              is_active: true,
            },
            {
              name: "foo-bar",
              is_active: false,
            },
          ],
        });
      }),
      http.get(mswEndpoint("/api/v1/workspaces/archive"), () => {
        return HttpResponse.json({
          workspaces: [],
        });
      }),
      http.get(
        mswEndpoint("/api/v1/workspaces/:workspace_name/messages"),
        () => {
          return HttpResponse.json([]);
        }
      ),
    ],
    searchParams: {
      search: null,
      view: AlertsFilterView.ALL,
    },
    expected: {
      title: emptyStateStrings.title.noMessagesWorkspace,
      body: emptyStateStrings.body.messagesWillShowUpWhenWorkspace,
      illustrationTestId: IllustrationTestId.DONE,
      actions: [
        {
          role: "link",
          name: "Learn about Workspaces",
          href: hrefs.external.docs.workspaces,
        },
      ],
    },
  },
  {
    testDescription: 'Has alerts, view is "malicious"',
    handlers: [
      http.get(mswEndpoint("/api/v1/workspaces"), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: "default",
              is_active: true,
            },
            {
              name: "foo-bar",
              is_active: false,
            },
          ],
        });
      }),
      http.get(mswEndpoint("/api/v1/workspaces/archive"), () => {
        return HttpResponse.json({
          workspaces: [],
        });
      }),
      http.get(
        mswEndpoint("/api/v1/workspaces/:workspace_name/messages"),
        () => {
          return HttpResponse.json(
            Array.from({ length: 10 }).map(() => mockAlert({ type: "secret" }))
          );
        }
      ),
    ],
    searchParams: {
      view: AlertsFilterView.MALICIOUS,
      search: null,
    },
    expected: {
      title: emptyStateStrings.title.noMaliciousPackagesDetected,
      body: emptyStateStrings.body.maliciousDesc,
      illustrationTestId: IllustrationTestId.DONE,
      actions: null,
    },
  },
  {
    testDescription: 'Has alerts, view is "secret"',
    handlers: [
      http.get(mswEndpoint("/api/v1/workspaces"), () => {
        return HttpResponse.json({
          workspaces: [
            {
              name: "default",
              is_active: true,
            },
            {
              name: "foo-bar",
              is_active: false,
            },
          ],
        });
      }),
      http.get(mswEndpoint("/api/v1/workspaces/archive"), () => {
        return HttpResponse.json({
          workspaces: [],
        });
      }),
      http.get(
        mswEndpoint("/api/v1/workspaces/:workspace_name/messages"),
        () => {
          return HttpResponse.json(
            Array.from({ length: 10 }).map(() =>
              mockAlert({ type: "malicious" })
            )
          );
        }
      ),
    ],
    searchParams: {
      view: AlertsFilterView.SECRETS,
      search: null,
    },
    expected: {
      title: emptyStateStrings.title.noLeakedSecretsDetected,
      body: emptyStateStrings.body.secretsDesc,
      illustrationTestId: IllustrationTestId.DONE,
      actions: null,
    },
  },
];

test.each(TEST_CASES)("$testDescription", async (testCase) => {
  server.use(...testCase.handlers);

  vi.mocked(useSearchParams).mockReturnValue([
    new URLSearchParams({
      search: testCase.searchParams.search ?? "",
      view: testCase.searchParams.view,
    }),
    () => {},
  ]);

  const { getByText, getByRole, getByTestId } = render(<TableMessages />);

  await waitFor(() => {
    expect(
      getByRole("heading", { level: 4, name: testCase.expected.title })
    ).toBeVisible();
    expect(getByText(testCase.expected.body)).toBeVisible();
    expect(getByTestId(testCase.expected.illustrationTestId)).toBeVisible();

    if (testCase.expected.actions) {
      for (const action of testCase.expected.actions) {
        const actionButton = getByRole(action.role, { name: action.name });
        expect(actionButton).toBeVisible();
        if (action.href) {
          expect(actionButton).toHaveAttribute("href", action.href);
        }
      }
    }
  });
});
