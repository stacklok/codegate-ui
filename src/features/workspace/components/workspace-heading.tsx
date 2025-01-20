import { Heading } from "@stacklok/ui-kit";

export function WorkspaceHeading({ title }: { title: string }) {
  return (
    <Heading level={4} className="mb-5">
      {title}
    </Heading>
  );
}
