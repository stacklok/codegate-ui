import { v1DeleteWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";
import { toast } from "@stacklok/ui-kit";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useArchiveWorkspace() {
  const navigate = useNavigate();
  return useMutation({
    ...v1DeleteWorkspaceMutation(),
    onSuccess: () => navigate("/workspaces"),
    onError: (err) => {
      toast.error(err.detail ? `${err.detail}` : "Failed to archive workspace");
    },
  });
}
