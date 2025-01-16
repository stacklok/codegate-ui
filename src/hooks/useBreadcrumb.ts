import { extractTitleFromMessage, sanitizeQuestionPrompt } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useCurrentPromptStore } from "./useCurrentPromptStore";
import { usePromptsDataStore } from "./usePromptsDataStore";

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
  const { currentPromptId } = useCurrentPromptStore();
  const { prompts } = usePromptsDataStore();

  const match = routes.find((route) => pathname.startsWith(route.path));
  if (match?.path === "/prompt/") {
    try {
      const chat = prompts.find((prompt) => prompt.chat_id === currentPromptId);
      const title = chat?.question_answers?.[0]?.question?.message ?? "";

      const sanitized = sanitizeQuestionPrompt({
        question: title,
        answer: chat?.question_answers?.[0]?.answer?.message ?? "",
      });
      return extractTitleFromMessage(sanitized) ?? "";
    } catch {
      return "";
    }
  }

  return match ? match.breadcrumb : "";
}
