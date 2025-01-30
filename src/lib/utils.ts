import { AlertConversation, Conversation } from "@/api/generated/types.gen";
import { isAlertSecret } from "@/features/alerts/lib/is-alert-secret";
import { isAlertMalicious } from "@/features/alerts/lib/is-alert-malicious";
import { format, isToday, isYesterday } from "date-fns";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;
const TEEN_DAYS_MS = 14 * ONE_DAY_MS;
const THTY_DAYS_MS = 30 * ONE_DAY_MS;
const FILEPATH_REGEX = /(?:---FILEPATH|Path:|\/\/\s*filepath:)\s*([^\s]+)/g;
const COMPARE_CODE_REGEX = /Compare this snippet[^:]*:/g;

function parsingByKeys(text: string | undefined, timestamp: string) {
  const fallback = `Prompt ${format(new Date(timestamp ?? ""), "y/MM/dd - hh:mm:ss a")}`;
  try {
    if (!text) return fallback;
    const filePath = text.match(FILEPATH_REGEX);
    const compareCode = text.match(COMPARE_CODE_REGEX);
    // there some edge cases in copilot where the prompts are not correctly parsed. In this case is better to show the filepath
    if (compareCode || filePath) {
      if (filePath)
        return `Prompt on file${filePath[0]?.trim().toLocaleLowerCase()}`;

      if (compareCode)
        return `Prompt from snippet ${compareCode[0]?.trim().toLocaleLowerCase()}`;
    }

    return text.trim();
  } catch {
    return fallback;
  }
}

export function parsingPromptText(message: string, timestamp: string) {
  try {
    // checking malformed markdown code blocks
    const regex = /^(.*)```[\s\S]*?```(.*)$/s;
    const match = message.match(regex);

    if (match !== null && match !== undefined) {
      const beforeMarkdown = match[1]?.trim();
      const afterMarkdown = match[2]?.trim();
      const title = beforeMarkdown || afterMarkdown;
      return parsingByKeys(title, timestamp);
    }

    return parsingByKeys(message, timestamp);
  } catch {
    return message.trim();
  }
}

function getGroup(differenceInMs: number, promptDate: Date): string {
  if (isToday(promptDate)) {
    return "Today";
  }
  if (isYesterday(promptDate)) {
    return "Yesterday";
  }
  if (differenceInMs <= SEVEN_DAYS_MS) {
    return "Previous 7 days";
  }
  if (differenceInMs <= TEEN_DAYS_MS) {
    return "Previous 14 days";
  }
  if (differenceInMs <= THTY_DAYS_MS) {
    return "Previous 30 days";
  }
  return "Beyond 30 days";
}

export function groupPromptsByRelativeDate(prompts: Conversation[]) {
  const promptsSorted = prompts.sort(
    (a, b) =>
      new Date(b.conversation_timestamp).getTime() -
      new Date(a.conversation_timestamp).getTime(),
  );

  const grouped = promptsSorted.reduce(
    (groups, prompt) => {
      const promptDate = new Date(prompt.conversation_timestamp);
      const now = new Date();
      const differenceInMs = now.getTime() - promptDate.getTime();
      const group = getGroup(differenceInMs, promptDate);

      if (!groups[group]) {
        groups[group] = [];
      }

      (groups[group] ?? []).push(prompt);
      return groups;
    },
    {} as Record<string, Conversation[]>,
  );

  return grouped;
}

export function sanitizeQuestionPrompt({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  try {
    // it shouldn't be possible to receive the prompt answer without a question
    if (!answer) {
      throw new Error("Missing AI answer");
    }

    // Check if 'answer' is truthy; if so, try to find and return the text after "Query:"
    const index = question.indexOf("Query:");
    if (index !== -1) {
      // Return the substring starting right after the first occurrence of "Query:"
      // Adding the length of "Query:" to the index to start after it
      return question.substring(index + "Query:".length).trim();
    }
    return question;
  } catch (error) {
    // Log the error and return the original question as a fallback
    console.error("Error processing the question:", error);
    return question;
  }
}

export function getIssueDetectedType(
  alert: AlertConversation,
): "malicious_package" | "leaked_secret" | null {
  if (isAlertMalicious(alert)) return "malicious_package";
  if (isAlertSecret(alert)) return "leaked_secret";

  return null;
}
