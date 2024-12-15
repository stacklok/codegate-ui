import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { usePromptsStore } from "@/hooks/usePromptsStore";
import { Markdown } from "./Markdown";
import { extractTitleFromMessage } from "@/lib/utils";

export function Chat() {
  const { id } = useParams();
  const chat = usePromptsStore((state) =>
    state.prompts.find((prompt) => prompt.chat_id === id)
  );
  const title = chat?.question_answers?.[0].question.message ?? "";

  return (
    <div className="h-screen mb-40 w-[calc(100vw-18rem)]">
      <div className="flex mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="w-96 truncate">
                {extractTitleFromMessage(title)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ChatMessageList className="h-[calc(100vh-9rem)]">
        {(chat?.question_answers ?? []).map(({ question, answer }, index) => (
          <div key={index} className="flex flex-col w-full h-full p-4 gap-6">
            <ChatBubble variant="sent">
              <ChatBubbleAvatar fallback="User" className="w-14" />
              <ChatBubbleMessage variant="sent" className="bg-zinc-700">
                <Markdown className="text-gray-300">
                  {question?.message}
                </Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage variant="received">
                <Markdown>{answer?.message}</Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        ))}
      </ChatMessageList>
    </div>
  );
}
