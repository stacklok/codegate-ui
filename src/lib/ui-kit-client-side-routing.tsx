import { useNavigate } from 'react-router-dom'
import { RouterProvider } from '@stacklok/ui-kit'

export function UiKitClientSideRoutingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()

  return <RouterProvider navigate={navigate}>{children}</RouterProvider>
}
