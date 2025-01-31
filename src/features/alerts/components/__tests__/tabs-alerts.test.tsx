import { server } from "@/mocks/msw/node";
import { http, HttpResponse } from "msw";
import { makeMockAlert } from "../../mocks/alert.mock";
import { render, waitFor } from "@/lib/test-utils";
import { TabsAlerts } from "../tabs-alerts";

test("shows correct count of all packages", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json([
        ...Array.from({ length: 13 }).map(() =>
          makeMockAlert({ type: "secret" }),
        ),
        ...Array.from({ length: 13 }).map(() =>
          makeMockAlert({ type: "malicious" }),
        ),
      ]);
    }),
  );

  const { getByRole } = render(
    <TabsAlerts>
      <div>foo</div>
    </TabsAlerts>,
  );

  await waitFor(() => {
    expect(getByRole("tab", { name: /all/i })).toHaveTextContent("26");
  });
});

test("shows correct count of malicious packages", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json(
        Array.from({ length: 13 }).map(() =>
          makeMockAlert({ type: "malicious" }),
        ),
      );
    }),
  );

  const { getByRole } = render(
    <TabsAlerts>
      <div>foo</div>
    </TabsAlerts>,
  );

  await waitFor(() => {
    expect(getByRole("tab", { name: /malicious/i })).toHaveTextContent("13");
  });
});

test("shows correct count of secret packages", async () => {
  server.use(
    http.get("*/workspaces/:name/alerts", () => {
      return HttpResponse.json(
        Array.from({ length: 13 }).map(() => makeMockAlert({ type: "secret" })),
      );
    }),
  );

  const { getByRole } = render(
    <TabsAlerts>
      <div>foo</div>
    </TabsAlerts>,
  );

  await waitFor(() => {
    expect(getByRole("tab", { name: /secrets/i })).toHaveTextContent("13");
  });
});
