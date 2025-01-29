import { CircleAlert } from "lucide-react";
import { Header } from "../features/header/components/header";
import { Card } from "@stacklok/ui-kit";

export function Error() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="shrink-0 w-full">
        <Header hasError />
      </div>
      <div className="h-24 flex flex-col flex-1 justify-center">
        <Card className="p-8 flex flex-col items-center">
          <CircleAlert className="text-red-600 mb-2 size-16" />
          <div className="text-xl font-semibold text-secondary text-center">
            An error occurred
          </div>
          <div className="text-base mb-4 text-secondary text-center text-balance">
            If this issue persists, please reach out to us on{" "}
            <a
              className="underline text-secondary"
              href="https://discord.gg/stacklok"
              rel="noopener noreferrer"
              target="_blank"
            >
              Discord
            </a>{" "}
            or open a new{" "}
            <a
              className="underline text-secondary"
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
