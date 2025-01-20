import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@stacklok/ui-kit/style";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { Error } from "./components/Error.tsx";
import { DarkModeProvider, Toaster } from "@stacklok/ui-kit";
import { client } from "./api/generated/index.ts";
import { QueryClientProvider } from "./components/react-query-provider.tsx";

// Initialize the API client
client.setConfig({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <SidebarProvider>
          <ErrorBoundary fallback={<Error />}>
            <QueryClientProvider>
              <Toaster />
              <App />
            </QueryClientProvider>
          </ErrorBoundary>
        </SidebarProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>,
);
