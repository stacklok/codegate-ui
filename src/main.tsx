import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './code.css'
import '@stacklok/ui-kit/style'
import App from './App.tsx'

import ErrorBoundary from './components/ErrorBoundary.tsx'
import { Error } from './components/Error.tsx'
import { DarkModeProvider, Toaster } from '@stacklok/ui-kit'
import { client } from './api/generated/index.ts'
import { QueryClientProvider } from './components/react-query-provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UiKitClientSideRoutingProvider } from './lib/ui-kit-client-side-routing.tsx'
import { ConfirmProvider } from './context/confirm-context.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Initialize the API client
client.setConfig({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UiKitClientSideRoutingProvider>
        <DarkModeProvider>
          <QueryClientProvider>
            <ErrorBoundary fallback={<Error />}>
              <ReactQueryDevtools />
              <ConfirmProvider>
                <Toaster />
                <App />
              </ConfirmProvider>
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </DarkModeProvider>
      </UiKitClientSideRoutingProvider>
    </BrowserRouter>
  </StrictMode>
)
