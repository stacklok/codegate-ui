import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

function HeaderMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-black hover:text-gray-800 font-semibold cursor-pointer text-base px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
      {children}
    </div>
  );
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
      <div className="py-1">{children}</div>
    </div>
  );
}

function DropdownMenuItem({
  children,
  to,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className="block px-5 py-3 text-gray-700 hover:bg-blue-50">
      {children}
    </Link>
  );
}

export function Header({ hasError }: { hasError?: boolean }) {
  return (
    <header className="flex-shrink-0 h-16 px-3 items-center flex w-full bg-teal-25 opacity-1 border-b-blue-200 border-b">
      <div className="flex items-center flex-1">
        {!hasError && (
          <>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-8 mx-3" />
          </>
        )}

        <nav className="mx-1 flex">
          <Link to="/">
            <h1 className="text-2xl w-max flex font-semibold">
              CodeGate Dashboard
            </h1>
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4 mr-16">
        <div className="flex items-center relative group">
          <HeaderMenuItem>Certificates</HeaderMenuItem>
          <DropdownMenu>
            <DropdownMenuItem to="/certificates">Download</DropdownMenuItem>
            <DropdownMenuItem to="/certificates/security">
              Certificate Security
            </DropdownMenuItem>
          </DropdownMenu>
        </div>

        <div className="flex items-center relative group">
          <HeaderMenuItem>Help</HeaderMenuItem>
          <DropdownMenu>
            <DropdownMenuItem to="/help/continue-setup">
              Continue Setup
            </DropdownMenuItem>
            <DropdownMenuItem to="/help/copilot-setup">
              Copilot Setup
            </DropdownMenuItem>
          </DropdownMenu>
        </div>

        <div className="flex items-center relative group">
          <div className="text-black hover:text-gray-800 font-semibold cursor-pointer text-base px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
            <a
              href="https://docs.codegate.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
