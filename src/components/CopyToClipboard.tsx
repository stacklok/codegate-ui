import clsx from "clsx";
import { ClipboardCopy } from "lucide-react";

export function CopyToClipboard({
  text,
  className,
}: {
  className?: string;
  text: string;
}) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={clsx(
        `absolute top-4 right-8 p-2 rounded-md 
    bg-gray-700/50 hover:bg-gray-700/70 
    transition-opacity duration-200 
    opacity-0 group-hover:opacity-100`,
        className,
      )}
    >
      <ClipboardCopy role="img" className="size-5 text-gray-200" />
    </button>
  );
}
