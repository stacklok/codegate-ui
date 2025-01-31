import { Heading } from "@stacklok/ui-kit";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useAlertsEmptyState } from "../hooks/use-alerts-empty-state";

const actionsStyle = tv({
  base: "mx-auto mt-6",
  variants: {
    actions: {
      1: "",
      2: "grid grid-cols-2 gap-2",
    },
  },
});

export function Actions({ actions }: { actions: [ReactNode, ReactNode?] }) {
  return (
    <div className={actionsStyle({ actions: actions.length })}>{actions}</div>
  );
}

export function TableAlertsEmptyState({ isLoading }: { isLoading: boolean }) {
  const {
    actions,
    body,
    illustration: Illustration,
    title,
  } = useAlertsEmptyState(isLoading);

  return (
    <div className="max-w-[40rem] mx-auto flex flex-col items-center text-center text-balance py-20 gap-2 px-4">
      <Illustration className="size-28" />
      <Heading level={4} className="font-bold text-gray-900">
        {title}
      </Heading>
      <p>{body}</p>
      {actions ? <Actions actions={actions} /> : null}
    </div>
  );
}
