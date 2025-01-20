import { Heading } from "@stacklok/ui-kit";
import React from "react";

export function WorkspaceHeading({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Heading level={4} className="mb-4 flex items-center justify-between">
      {title}
      {children}
    </Heading>
  );
}
