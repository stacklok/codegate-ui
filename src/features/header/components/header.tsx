import { Link } from "react-router-dom";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import { DropdownMenu } from "../../../components/HoverPopover";
import { Separator, ButtonDarkMode } from "@stacklok/ui-kit";
import { WorkspacesSelection } from "@/features/workspace/components/workspaces-selection";
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

export function Header({ hasError }: { hasError?: boolean }) {
  return (
    <header
      aria-label="App header"
      className="shrink-0 h-16 px-3 items-center flex w-full bg-gray-25 border-b-gray-200 border-b"
    >
      <div className="flex items-center gap-2 flex-1">
        {!hasError && (
          <>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-8" />
          </>
        )}

        <nav className="flex ml-2">
          <HomeLink />
        </nav>
        <Separator orientation="vertical" className="h-8 ml-4" />
        <WorkspacesSelection />
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
