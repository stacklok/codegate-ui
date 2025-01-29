import {
  Button,
  Menu,
  MenuTrigger,
  OptionsSchema,
  Popover,
} from "@stacklok/ui-kit";
import { OverlayTriggerStateContext } from "react-aria-components";
import { ReactNode, useContext } from "react";
import { ChevronDown, ChevronUp } from "@untitled-ui/icons-react";

function PopoverIcon() {
  const { isOpen = false } = useContext(OverlayTriggerStateContext) ?? {};

  return isOpen ? <ChevronUp /> : <ChevronDown />;
}

export function DropdownMenu({
  items,
  title,
}: {
  title: ReactNode;
  items: OptionsSchema<"menu">[];
  className?: string;
}) {
  return (
    <MenuTrigger>
      <Button variant="tertiary">
        {title}
        <PopoverIcon />
      </Button>
      <Popover placement="bottom end">
        <Menu items={items} />
      </Popover>
    </MenuTrigger>
  );
}
