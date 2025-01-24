"use client";

import { ConfirmContext } from "@/context/confirm-context";
import type { ReactNode } from "react";
import { useContext } from "react";

type Buttons = {
  yes: ReactNode;
  no: ReactNode;
};

type Config = {
  buttons: Buttons;
  title?: ReactNode;
  isDestructive?: boolean;
};

export type ConfirmFunction = (
  message: ReactNode,
  config: Config,
) => Promise<boolean>;

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirmContext must be used within a ConfirmProvider");
  }
  return context;
};
