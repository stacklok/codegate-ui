import { SidebarProvider } from "@/components/ui/sidebar";
import { ConfirmProvider } from "@/context/confirm-context";
import { DarkModeProvider, Toaster } from "@stacklok/ui-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderOptions, render } from "@testing-library/react";
import React, { ReactNode } from "react";
import {
  MemoryRouter,
  MemoryRouterProps,
  Route,
  Routes,
} from "react-router-dom";

type RoutConfig = {
  routeConfig?: MemoryRouterProps;
  pathConfig?: string;
};

export const TestQueryClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              gcTime: 0,
              staleTime: 0,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
};

const renderWithProviders = (
  children: React.ReactNode,
  options?: Omit<RenderOptions, "queries"> & RoutConfig,
) =>
  render(
    <TestQueryClientProvider>
      <DarkModeProvider>
        <ConfirmProvider>
          <Toaster />
          <MemoryRouter {...options?.routeConfig}>
            <Routes>
              <Route
                path={options?.pathConfig ?? "*"}
                element={<SidebarProvider>{children}</SidebarProvider>}
              />
            </Routes>
          </MemoryRouter>
        </ConfirmProvider>
      </DarkModeProvider>
    </TestQueryClientProvider>,
  );

export * from "@testing-library/react";

export { renderWithProviders as render };
