import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { HoverPopover } from "./HoverPopover";

// function HeaderMenuItem({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="text-black hover:text-gray-800 font-semibold cursor-pointer text-base px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
//       {children}
//     </div>
//   );
// }

// function DropdownMenu({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="absolute right-0 top-full mt-2 w-56 bg-base rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
//       <div className="py-1">{children}</div>
//     </div>
//   );
// }

// function DropdownMenuItem({
//   children,
//   to,
// }: {
//   to: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <Link to={to} className="block px-5 py-3 text-gray-700 hover:bg-blue-50">
//       {children}
//     </Link>
//   );
// }

export function Header({ hasError }: { hasError?: boolean }) {
  return (
    <header className="shrink-0 h-16 px-3 items-center flex w-full bg-gray-25 border-b-gray-200 border-b">
      <div className="flex items-center flex-1">
        {!hasError && (
          <>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-8 mx-3" />
          </>
        )}

        <nav className="mr-1 flex">
          <Link to="/">
            <h1 className="text-2xl text-primary font-title w-max flex font-semibold">
              CodeGate Dashboard
            </h1>
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4 mr-16">
        <HoverPopover title="Certificates">
          <Link
            to="/certificates"
            className="block px-5 py-3 text-secondary hover:bg-blue-50"
          >
            Download
          </Link>
          <Link
            to="/certificates/security"
            className="block px-5 py-3 text-secondary hover:bg-blue-50"
          >
            Certificate Security
          </Link>
        </HoverPopover>

        <HoverPopover title="Help">
          <Link
            to="/help/continue-setup"
            className="block px-5 py-3 text-secondary hover:bg-blue-50"
          >
            Continue Setup
          </Link>
          <Link
            to="/help/copilot-setup"
            className="block px-5 py-3 text-secondary hover:bg-blue-50"
          >
            Copilot Setup
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
      </div>
    </header>
  );
}
