import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

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
          <div className="text-black hover:text-gray-800 font-semibold cursor-pointer text-base px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
            Certificates
          </div>
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
            <div className="py-1">
              <Link
                to="/certificates"
                className="block px-5 py-3 text-gray-700 hover:bg-blue-50"
              >
                Download
              </Link>
              <Link
                to="/certificates/security"
                className="block px-5 py-3 text-gray-700 hover:bg-blue-50"
              >
                Certificate Security
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center relative group">
          <div className="text-black hover:text-gray-800 font-semibold cursor-pointer text-base px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
            Help
          </div>
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
            <div className="py-1">
              <Link
                to="/help/continue-setup"
                className="block px-5 py-3 text-gray-700 hover:bg-blue-50"
              >
                Continue Setup
              </Link>
              <Link
                to="/help/copilot-setup"
                className="block px-5 py-3 text-gray-700 hover:bg-blue-50"
              >
                Copilot Setup
              </Link>
            </div>
          </div>
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
