import { XCircle } from "lucide-react";

export function CodegateStatusErrorUI() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <XCircle className="text-red-600 mb-2 size-8" />
      <div className="text-base font-semibold text-secondary text-center">
        An error occurred
      </div>
      <div className="text-sm text-secondary text-center text-balance">
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
    </div>
  );
}
