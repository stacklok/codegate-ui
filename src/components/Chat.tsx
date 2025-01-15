import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { useParams } from "react-router-dom";
import { usePromptsStore } from "@/hooks/usePromptsStore";
import { Markdown } from "./Markdown";
import { useEffect } from "react";
import { sanitizeQuestionPrompt } from "@/lib/utils";

export function Chat() {
  const { id } = useParams();
  const { prompts, setCurrentPromptId } = usePromptsStore();
  const chat = prompts.find((prompt) => prompt.chat_id === id);

  useEffect(() => {
    if (id) {
      setCurrentPromptId(id);
    }

    return () => setCurrentPromptId("");
  }, [prompts, id, setCurrentPromptId]);

  return (
    <div className="w-[calc(100vw-18rem)]">
      <ChatMessageList>
        {(chat?.question_answers ?? []).map(({ question, answer }, index) => (
          <div key={index} className="flex flex-col size-full gap-6">
            <ChatBubble variant="sent">
              <ChatBubbleAvatar data-testid="avatar-user" fallback="User" />
              <ChatBubbleMessage variant="sent">
                <Markdown>
                  {sanitizeQuestionPrompt({
                    question: question?.message ?? "",
                    answer: answer?.message ?? "",
                  })}
                </Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant="received">
              <ChatBubbleAvatar data-testid="avatar-ai" fallback="AI" />
              <ChatBubbleMessage variant="received">
                <Markdown>{answer?.message ?? ""}</Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        ))}
      </ChatMessageList>
    </div>
  );
}
