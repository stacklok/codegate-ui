import { useQuery } from "@tanstack/react-query";
import { v1ListWorkspacesOptions } from "@/api/generated/@tanstack/react-query.gen";

export const useWorkspacesData = () => {
  return useQuery({
    ...v1ListWorkspacesOptions(),
  });
};
