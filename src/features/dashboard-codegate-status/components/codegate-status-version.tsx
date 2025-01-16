import { LoaderCircle, CheckCircle2, CircleAlert, XCircle } from "lucide-react";
import { VersionResponse } from "../lib/get-version-status";
import { Link, Tooltip, TooltipTrigger } from "@stacklok/ui-kit";

export const CodegateStatusVersion = ({
  data,
  isPending,
}: {
  data: VersionResponse | null;
  isPending: boolean;
}) => {
  if (isPending || data === null) {
    return (
      <div className="flex gap-2 items-center text-secondary justify-end overflow-hidden">
        Checking <LoaderCircle className="size-4 shrink-0 animate-spin" />
      </div>
    );
  }

  const { current_version, is_latest, latest_version, error } = data || {};

  if (error !== null || is_latest === null) {
    return (
      <div className="flex gap-2 items-center text-primary justify-end overflow-hidden">
        Error checking version <XCircle className="size-4 shrink-0" />
      </div>
    );
  }

  switch (is_latest) {
    case true:
      return (
        <div className="flex gap-2 items-center text-primary justify-end">
          Latest <CheckCircle2 className="size-4 shrink-0" />
        </div>
      );
    case false:
      return (
        <div>
          <TooltipTrigger delay={0}>
            <Link
              className="flex gap-2 items-center text-primary justify-end overflow-hidden"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.codegate.ai/how-to/install#upgrade-codegate"
            >
              Update available <CircleAlert className="size-4 shrink-0" />
            </Link>
            <Tooltip className="text-right">
              <span className="block">Current version: {current_version}</span>
              <span className="block">Latest version: {latest_version}</span>
            </Tooltip>
          </TooltipTrigger>
        </div>
      );
    default: {
      is_latest satisfies never;
    }
  }
};
