import { Route, Routes } from "react-router-dom";

import { RouteWorkspace } from "./routes/route-workspace";
import { RouteWorkspaces } from "./routes/route-workspaces";
import { RouteCertificates } from "./routes/route-certificates";
import { RouteHelp } from "./routes/route-help";
import { RouteChat } from "./routes/route-chat";
import { RouteDashboard } from "./routes/route-dashboard";
import { RouteCertificateSecurity } from "./routes/route-certificate-security";
import { RouteWorkspaceCreation } from "./routes/route-workspace-creation";

export default function Page() {
  return (
    <Routes>
      <Route path="/" element={<RouteDashboard />} />
      <Route path="/prompt/:id" element={<RouteChat />} />
      <Route path="/help/:section" element={<RouteHelp />} />
      <Route path="/certificates" element={<RouteCertificates />} />
      <Route path="/workspace/:name" element={<RouteWorkspace />} />
      <Route path="/workspaces" element={<RouteWorkspaces />} />
      <Route path="/workspace/create" element={<RouteWorkspaceCreation />} />
      <Route
        path="/certificates/security"
        element={<RouteCertificateSecurity />}
      />
    </Routes>
  );
}
