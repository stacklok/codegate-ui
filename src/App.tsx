import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { Routes, Route, Link } from "react-router-dom";
import { usePromptsData } from "./hooks/usePromptsData";
import { Sidebar } from "./components/Sidebar";
import { useSse } from "./hooks/useSse";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./components/ui/breadcrumb";
import { useBreadcrumb } from "./hooks/useBreadcrumb";
import { RouteWorkspace } from "./routes/route-workspace";
import { RouteWorkspaces } from "./routes/route-workspaces";
import { RouteCertificates } from "./routes/route-certificates";
import { RouteHelp } from "./routes/route-help";
import { RouteChat } from "./routes/route-chat";
import { RouteDashboard } from "./routes/route-dashboard";
import { RouteCertificateSecurity } from "./routes/route-certificate-security";

function App() {
  const { data: prompts, isLoading } = usePromptsData();
  useSse();
  const breadcrumb = useBreadcrumb();

  return (
    <div className="flex w-screen h-screen">
      <Sidebar loading={isLoading}>
        <PromptList prompts={prompts ?? []} />
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="px-6 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/">Dashboard</Link>
              </BreadcrumbItem>
              {breadcrumb && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="w-96 truncate">
                      {breadcrumb}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<RouteDashboard />} />
            <Route path="/prompt/:id" element={<RouteChat />} />
            <Route path="/help/:section" element={<RouteHelp />} />
            <Route path="/certificates" element={<RouteCertificates />} />
            <Route path="/workspace/:id" element={<RouteWorkspace />} />
            <Route path="/workspaces" element={<RouteWorkspaces />} />
            <Route
              path="/certificates/security"
              element={<RouteCertificateSecurity />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
