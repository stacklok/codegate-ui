import { v1ActivateWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";

export function useActivateWorkspace() {
  return useMutation({
    ...v1ActivateWorkspaceMutation(),
  });
}
