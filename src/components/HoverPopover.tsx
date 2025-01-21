import { Button, DropdownMenu, MenuTrigger, Popover } from "@stacklok/ui-kit";
import { OverlayTriggerStateContext } from "react-aria-components";
import { ReactNode, useContext } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function PopoverIcon() {
  const { isOpen = false } = useContext(OverlayTriggerStateContext) ?? {};

  return isOpen ? <ChevronUp /> : <ChevronDown />;
}

export function HoverPopover({
  children,
  title,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <MenuTrigger>
      <Button variant="tertiary">
        {title}
        <PopoverIcon />
      </Button>
      <Popover>
        <DropdownMenu>{children}</DropdownMenu>
      </Popover>
    </MenuTrigger>
  );
}
