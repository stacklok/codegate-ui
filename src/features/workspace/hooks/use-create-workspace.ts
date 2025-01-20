import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { v1CreateWorkspaceMutation } from "@/api/generated/@tanstack/react-query.gen";

export function useCreateWorkspace() {
  const navigate = useNavigate();
  return useMutation({
    ...v1CreateWorkspaceMutation(),
    onSuccess: () => navigate("/workspaces"),
  });
}
