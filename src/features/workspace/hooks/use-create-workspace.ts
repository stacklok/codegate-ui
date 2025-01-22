import { useMutation } from "@tanstack/react-query";
import { v1CreateWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";

export function useCreateWorkspace() {
  return useMutation({
    ...v1CreateWorkspaceMutation(),
  });
}
