import { Route, Routes } from 'react-router-dom'

import { RouteWorkspace } from './routes/route-workspace'
import { RouteWorkspaces } from './routes/route-workspaces'
import { RouteCertificates } from './routes/route-certificates'
import { RouteChat } from './routes/route-chat'
import { RouteDashboard } from './routes/route-dashboard'
import { RouteCertificateSecurity } from './routes/route-certificate-security'
import { RouteWorkspaceCreation } from './routes/route-workspace-creation'
import { RouteNotFound } from './routes/route-not-found'
import { RouteProvider } from './routes/route-providers'
import { RouteProviderCreate } from './routes/route-provider-create'
import { RouteProviderUpdate } from './routes/route-provider-update'
import { RouteMuxes } from './routes/route-mux-config'

export default function Page() {
  return (
    <Routes>
      <Route path="/" element={<RouteDashboard />} />
      <Route path="/prompt/:id" element={<RouteChat />} />
      <Route path="/certificates" element={<RouteCertificates />} />
      <Route path="/workspace/:name" element={<RouteWorkspace />} />
      <Route path="/workspaces" element={<RouteWorkspaces />} />
      <Route path="/muxes" element={<RouteMuxes />} />
      <Route path="/workspace/create" element={<RouteWorkspaceCreation />} />
      <Route
        path="/certificates/security"
        element={<RouteCertificateSecurity />}
      />

      <Route path="providers">
        <Route index element={<RouteProvider />} />
        <Route element={<RouteProvider />}>
          <Route path=":id" element={<RouteProviderUpdate />} />
          <Route path="new" element={<RouteProviderCreate />} />
        </Route>
      </Route>

      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  )
}
