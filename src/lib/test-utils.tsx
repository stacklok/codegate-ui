import { RenderOptions, render } from "@testing-library/react";
import React from "react";
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

const renderWithProviders = (
  children: React.ReactNode,
  options?: Omit<RenderOptions, "queries"> & RoutConfig,
) =>
  render(
    <MemoryRouter {...options?.routeConfig}>
      <Routes>
        <Route path={options?.pathConfig ?? "/"} element={children} />
      </Routes>
    </MemoryRouter>,
  );

export * from "@testing-library/react";

export { renderWithProviders as render };
