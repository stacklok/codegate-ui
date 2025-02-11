import {
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
  VerticalLayout,
} from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { renderChildren } from "./renderChildren";

function VerticalLayoutRenderer({
  uischema,
  enabled,
  schema,
  path,
}: RendererProps) {
  const verticalLayout = uischema as VerticalLayout;

  return <div>{renderChildren(verticalLayout, schema, path, enabled)}</div>;
}

export const renderer = withJsonFormsLayoutProps(VerticalLayoutRenderer, false);

export const tester: RankedTester = rankWith(1, uiTypeIs("VerticalLayout"));

const config = { tester, renderer };

export default config;
