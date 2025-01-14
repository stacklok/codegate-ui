import { XCircle } from "lucide-react";
import { Header } from "./Header";
import { Card } from "./ui/card";

export function Error() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex-0 w-full">
        <Header hasError />
      </div>
      <div className="h-24 flex flex-col flex-1 justify-center">
        <Card className="p-8 flex flex-col items-center">
          <XCircle className="text-red-600 mb-2 size-8" />
          <div className="text-md font-semibold text-gray-600 text-center">
            An error occurred
          </div>
          <div className="text-sm text-gray-600 text-center text-balance">
            If this issue persists, please reach out to us on{" "}
            <a
              className="underline text-gray-700"
              href="https://discord.gg/stacklok"
              rel="noopener noreferrer"
              target="_blank"
            >
              Discord
            </a>{" "}
            or open a new{" "}
            <a
              className="underline text-gray-700"
              href="https://github.com/stacklok/codegate/issues/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github issue
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
