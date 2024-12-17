import { extractTitleFromMessage } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { usePromptsStore } from "./usePromptsStore";

const routes = [
  { path: "/certificates/security", breadcrumb: "Certificate Security" },
  { path: "/certificates", breadcrumb: "Certificate Download" },
  { path: "/help/continue-setup", breadcrumb: "Continue Setup" },
  { path: "/help/copilot-setup", breadcrumb: "Copilot Setup" },
  { path: "/prompt/", breadcrumb: "Dashboard" },
  { path: "/", breadcrumb: "" },
];

export function useBreadcrumb() {
  const { pathname } = useLocation();
  const { currentPromptId, prompts } = usePromptsStore();

  const match = routes.find((route) => pathname.startsWith(route.path));
  if (match?.path === "/prompt/") {
    try {
      const chat = prompts.find((prompt) => prompt.chat_id === currentPromptId);
      const title = chat?.question_answers?.[0].question.message ?? "";
      return extractTitleFromMessage(title) ?? "";
    } catch {
      return "";
    }
  }

  return match ? match.breadcrumb : "";
}
