import { useEffect } from "react";

export function useKbdShortcuts(map: [string, () => void][]) {
  return useEffect(() => {
    const documentListener = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      for (const [key, callback] of map) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          e.preventDefault();
          e.stopPropagation();
          callback();
        }
      }
    };

    document.addEventListener("keydown", documentListener);

    return () => {
      document.removeEventListener("keydown", documentListener);
    };
  }, [map]);
}
