import { useQuery } from "@tanstack/react-query";
import Prism from "prismjs";

const fetchHelpContent = async (
  section: string | undefined,
): Promise<string> => {
  if (!section) {
    throw new Error("Section is required");
  }

  const response = await fetch(`/help/${section}.md`);
  if (!response.ok) {
    throw new Error("Failed to load content");
  }

  return response.text();
};

export const useHelpContent = (section: string | undefined) => {
  return useQuery({
    queryKey: ["helpContent", section],
    queryFn: () => fetchHelpContent(section),
    enabled: !!section,
    staleTime: 0,
    select: (data) => {
      // Allow content to render before highlighting
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
      return data;
    },
  });
};
