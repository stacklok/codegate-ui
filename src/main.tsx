import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { Error } from "./components/Error.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <ErrorBoundary fallback={<Error />}>
          <QueryClientProvider client={new QueryClient()}>
            <App />
          </QueryClientProvider>
        </ErrorBoundary>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
