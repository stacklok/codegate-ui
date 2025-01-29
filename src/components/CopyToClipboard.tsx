import { Button, Tooltip, TooltipTrigger } from "@stacklok/ui-kit";
import { ClipboardCheck, Copy02 } from "@untitled-ui/icons-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function CopyToClipboard({
  text,
  className,
}: {
  className?: string;
  text: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <TooltipTrigger delay={0} closeDelay={500}>
      <Button
        variant="tertiary"
        className={twMerge(
          "size-7 text-secondary",
          className,
          copied ? "text-primary" : "text-secondary",
        )}
        onPress={() => {
          navigator.clipboard.writeText(text);
          setCopied(true);
        }}
      >
        {copied ? (
          <ClipboardCheck data-testid="icon-clipboard-check" />
        ) : (
          <Copy02 data-testid="icon-clipboard-copy" />
        )}
      </Button>

      <Tooltip placement="top" className="text-center">
        Copy to clipboard
      </Tooltip>
    </TooltipTrigger>
  );
}
