import {
  DialogModalOverlay,
  DialogModal,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
} from "@stacklok/ui-kit";
import { useNavigate } from "react-router-dom";

export function ProviderDialog({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <DialogModalOverlay
      isDismissable={false}
      isOpen
      onOpenChange={() => {
        navigate("/providers");
      }}
    >
      <DialogModal>
        <Dialog width="md" className="">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogCloseButton slot="close" />
          </DialogHeader>
          {children}
        </Dialog>
      </DialogModal>
    </DialogModalOverlay>
  );
}
