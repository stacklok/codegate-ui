import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { HoverPopover } from "./HoverPopover";
import { Separator, ButtonDarkMode } from "@stacklok/ui-kit";
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
          <Link
            to="/certificates"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Download
          </Link>
          <Link
            to="/certificates/security"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Certificate Security
          </Link>
        </HoverPopover>

        <HoverPopover title="Setup">
          <Link
            to="/help/continue-setup"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Set up in <span className="font-bold">Continue</span>
          </Link>
          <Link
            to="/help/copilot-setup"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Set up in <span className="font-bold">Copilot</span>
          </Link>
        </HoverPopover>

        <div className="flex items-center relative group">
          <div className="text-primary hover:text-secondary font-semibold cursor-pointer text-base px-2 py-1 rounded-md transition-colors">
            <a
              href="https://docs.codegate.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </div>

        <ButtonDarkMode />
      </div>
    </header>
  );
}
