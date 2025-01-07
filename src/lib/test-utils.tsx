import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

const renderWithProviders = (
  children: React.ReactNode,
  routeConfig?: MemoryRouterProps,
) => render(<MemoryRouter {...routeConfig}>{children}</MemoryRouter>);

export * from "@testing-library/react";

export { renderWithProviders as render };
