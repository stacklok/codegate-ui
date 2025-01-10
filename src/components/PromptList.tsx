import { Link } from "react-router-dom";
import {
  extractTitleFromMessage,
  groupPromptsByRelativeDate,
  sanitizeQuestionPrompt,
} from "@/lib/utils";
import { usePromptsStore } from "@/hooks/usePromptsStore";
import clsx from "clsx";
import { Conversation } from "@/api/generated";

export function PromptList({ prompts }: { prompts: Conversation[] }) {
  const { currentPromptId, setCurrentPromptId } = usePromptsStore();

  const groupedPrompts = groupPromptsByRelativeDate(prompts);

  return (
    <div className="mx-2">
      {Object.entries(groupedPrompts).map(([group, prompts]) => (
        <div key={group} className="mb-3">
          <h2 className="font-bold text-sm text-gray-700 mb-2 mt-6">{group}</h2>
          <ul className="space-y-2">
            {prompts.map((prompt) => (
              <li key={prompt.chat_id} className="flex items-center p-1 w-full">
                <Link
                  onClick={() => setCurrentPromptId(prompt.chat_id)}
                  to={`/prompt/${prompt.chat_id}`}
                  className={clsx(
                    `text-gray-800 text-sm truncate hover:text-gray-500`,
                    { "font-bold": currentPromptId === prompt.chat_id },
                  )}
                >
                  {extractTitleFromMessage(
                    prompt.question_answers?.[0]?.question?.message
                      ? sanitizeQuestionPrompt({
                          question:
                            prompt.question_answers?.[0].question.message,
                          answer:
                            prompt.question_answers?.[0]?.answer?.message ?? "",
                        })
                      : `Prompt ${prompt.conversation_timestamp}`,
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
