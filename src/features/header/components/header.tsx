import { Link } from "react-router-dom";

import { DropdownMenu } from "../../../components/HoverPopover";
import { Separator, ButtonDarkMode } from "@stacklok/ui-kit";
import { HeaderActiveWorkspaceSelector } from "@/features/header/components/header-active-workspace-selector";
import { HELP_MENU_ITEMS } from "../constants/help-menu-items";
import { HeaderStatusMenu } from "./header-status-menu";
import { SETTINGS_MENU_ITEMS } from "../constants/settings-menu-items";

function HomeLink() {
  return (
    <Link to="/">
      <h1 className="text-2xl text-primary font-title w-max flex font-semibold">
        CodeGate
      </h1>
    </Link>
  );
}

export function Header() {
  return (
    <header
      aria-label="App header"
      className="sticky top-0 z-10 shrink-0 h-16 px-6 items-center flex w-screen bg-gray-25 border-b-gray-200 border-b"
    >
      <div className="flex items-center gap-2 flex-1">
        <nav className="flex ml-2">
          <HomeLink />
        </nav>
        <Separator orientation="vertical" className="h-8 ml-4" />
        <HeaderActiveWorkspaceSelector />
      </div>
      <div className="flex items-center gap-1 mr-2">
        <HeaderStatusMenu />
        <DropdownMenu title="Help" items={HELP_MENU_ITEMS} />
        <DropdownMenu title="Settings" items={SETTINGS_MENU_ITEMS} />

        <ButtonDarkMode />
      </div>
    </header>
  );
}
