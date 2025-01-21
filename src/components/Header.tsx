import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { HoverPopover } from "./HoverPopover";
import { Separator, ButtonDarkMode, MenuItem } from "@stacklok/ui-kit";
import { WorkspacesSelection } from "@/features/workspace/components/workspaces-selection";
import {
  Blocks,
  Download,
  MessageCircleQuestion,
  ShieldCheck,
} from "lucide-react";

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
            icon={<Download />}
            href="/certificates"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Download
          </MenuItem>

          <MenuItem
            href="/certificates/security"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
            icon={<ShieldCheck />}
          >
            Certificate Security
          </MenuItem>
        </HoverPopover>

        <HoverPopover title="Help">
          <MenuItem href="/help/continue-setup" icon={<Blocks />}>
            Set up in <span className="font-bold">Continue</span>
          </MenuItem>
          <MenuItem
            icon={<Blocks />}
            href="/help/copilot-setup"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
          >
            Set up in <span className="font-bold">Copilot</span>
          </MenuItem>

          <MenuItem
            href="https://docs.codegate.ai/"
            target="_blank"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
            icon={<ShieldCheck />}
          >
            Documentation
          </MenuItem>

          <Separator />

          <MenuItem
            href="https://discord.gg/stacklok"
            target="_blank"
            className="block px-5 py-3 text-secondary hover:bg-brand-50"
            icon={<MessageCircleQuestion />}
          >
            Discord
          </MenuItem>
        </HoverPopover>

        <ButtonDarkMode />
      </div>
    </header>
  );
}
