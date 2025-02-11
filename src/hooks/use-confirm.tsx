"use client";

import { ConfirmContext } from "@/context/confirm-context";
import { useContext } from "react";

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirmContext must be used within a ConfirmProvider");
  }
  return context;
};
