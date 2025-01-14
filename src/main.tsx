import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { Error } from "./components/Error.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <ErrorBoundary fallback={<Error />}>
          <App />
        </ErrorBoundary>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
