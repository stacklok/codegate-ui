import { Heading } from "@stacklok/ui-kit";
import { JSX, ReactNode, SVGProps } from "react";
import { tv } from "tailwind-variants";

const actionsStyle = tv({
  base: "mx-auto mt-8",
  variants: {
    actions: {
      1: "",
      2: "grid grid-cols-2 gap-2",
    },
  },
});

function Actions({ actions }: { actions: [ReactNode, ReactNode?] }) {
  return (
    <div className={actionsStyle({ actions: actions.length })}>{actions}</div>
  );
}

export function EmptyState({
  actions,
  body,
  illustration: Illustration,
  title,
}: {
  illustration: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  body: string;
  actions: [ReactNode, ReactNode?] | null;
}) {
  return (
    <div className="max-w-[40rem] mx-auto py-32 flex items-center justify-center flex-col text-center text-balance">
      <Illustration className="size-32 mb-4" />
      <Heading level={4} className="font-bold text-gray-900 mb-2">
        {title}
      </Heading>
      <p>{body}</p>
      {actions ? <Actions actions={actions} /> : null}
    </div>
  );
}
