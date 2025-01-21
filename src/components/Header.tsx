import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { HoverPopover } from "./HoverPopover";
import {
  Separator,
  ButtonDarkMode,
  MenuItem,
  LinkButton,
} from "@stacklok/ui-kit";
import { WorkspacesSelection } from "@/features/workspace/components/workspaces-selection";

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
          <Link to="/">
            <h1 className="text-2xl text-primary font-title w-max flex font-semibold">
              CodeGate Dashboard
            </h1>
          </Link>
        </nav>
        <Separator orientation="vertical" className="h-8 ml-4" />
        <WorkspacesSelection />
      </div>
      <div className="flex items-center gap-4 mr-16">
        <HoverPopover title="Certificates">
          <MenuItem
            href="/certificates"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Download
          </MenuItem>
          <MenuItem
            href="/certificates/security"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Certificate Security
          </MenuItem>
        </HoverPopover>

        <HoverPopover title="Setup">
          <MenuItem href="/help/continue-setup">
            Set up in <span className="font-bold">Continue</span>
          </MenuItem>
          <MenuItem
            href="/help/copilot-setup"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Set up in <span className="font-bold">Copilot</span>
          </MenuItem>
        </HoverPopover>

        <LinkButton
          variant="tertiary"
          href="https://docs.codegate.ai/"
          target="_blank"
        >
          Documentation
        </LinkButton>

        <ButtonDarkMode />
      </div>
    </header>
  );
}
