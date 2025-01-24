"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogModal,
  DialogModalOverlay,
  DialogTitle,
} from "@stacklok/ui-kit";
import type { ReactNode } from "react";
import { createContext, useState } from "react";

type Buttons = {
  yes: ReactNode;
  no: ReactNode;
};

type Config = {
  buttons: Buttons;
  title?: ReactNode;
  isDestructive?: boolean;
};

type Question = {
  message: ReactNode;
  config: Config;
  resolve: (value: boolean) => void;
};

type ConfirmContextType = {
  confirm: (message: ReactNode, config: Config) => Promise<boolean>;
};

export const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAnswer = (answer: boolean) => {
    if (activeQuestion === null) return;
    activeQuestion.resolve(answer);
    setIsOpen(false);
  };

  const confirm = (message: ReactNode, config: Config) => {
    return new Promise<boolean>((resolve) => {
      setActiveQuestion({ message, config, resolve });
      setIsOpen(true);
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <DialogModalOverlay isDismissable={false} isOpen={isOpen}>
        <DialogModal>
          <Dialog>
            <DialogHeader>
              <DialogTitle>{activeQuestion?.config.title}</DialogTitle>
            </DialogHeader>
            <DialogContent>{activeQuestion?.message}</DialogContent>
            <DialogFooter>
              <div className="flex grow justify-end gap-2">
                <Button variant="secondary" onPress={() => handleAnswer(false)}>
                  {activeQuestion?.config.buttons.no ?? "&nbsp;"}
                </Button>
                <Button
                  isDestructive={activeQuestion?.config.isDestructive}
                  variant="primary"
                  onPress={() => handleAnswer(true)}
                >
                  {activeQuestion?.config.buttons.yes ?? "&nbsp;"}
                </Button>
              </div>
            </DialogFooter>
          </Dialog>
        </DialogModal>
      </DialogModalOverlay>
    </ConfirmContext.Provider>
  );
}
