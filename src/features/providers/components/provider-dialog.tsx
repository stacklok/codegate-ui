import {
  DialogModalOverlay,
  DialogModal,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
} from "@stacklok/ui-kit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ProviderDialog({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <DialogModalOverlay
      isDismissable={false}
      isOpen={isModalOpen}
      onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen);
        navigate("/providers");
      }}
    >
      <DialogModal>
        <Dialog width="md" className="">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          {children}
        </Dialog>
      </DialogModal>
    </DialogModalOverlay>
  );
}
