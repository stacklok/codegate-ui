import { Header } from "./components/Header";
import { PromptList } from "./components/PromptList";
import { Routes, Route } from "react-router-dom";
import { usePromptsData } from "./hooks/usePromptsData";
import { Sidebar } from "./components/Sidebar";
import { useSse } from "./hooks/useSse";
import { RouteWorkspace } from "./routes/route-workspace";
import { RouteWorkspaces } from "./routes/route-workspaces";
import { RouteCertificates } from "./routes/route-certificates";
import { RouteHelp } from "./routes/route-help";
import { RouteChat } from "./routes/route-chat";
import { RouteDashboard } from "./routes/route-dashboard";
import { RouteCertificateSecurity } from "./routes/route-certificate-security";
import { WorkspaceCreation } from "./features/workspace/components/workspace-creation";

function App() {
  const { data: prompts, isLoading } = usePromptsData();
  useSse();

  return (
    <div className="flex w-screen h-screen">
      <Sidebar loading={isLoading}>
        <PromptList prompts={prompts ?? []} />
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          <Routes>
            <Route path="/" element={<RouteDashboard />} />
            <Route path="/prompt/:id" element={<RouteChat />} />
            <Route path="/help/:section" element={<RouteHelp />} />
            <Route path="/certificates" element={<RouteCertificates />} />
            <Route path="/workspace/:id" element={<RouteWorkspace />} />
            <Route path="/workspaces" element={<RouteWorkspaces />} />
            <Route path="/workspace/create" element={<WorkspaceCreation />} />
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
