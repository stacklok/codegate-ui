import { Alert, Prompt } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { isToday, isYesterday } from "date-fns";
import { twMerge } from "tailwind-merge";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;
const TEEN_DAYS_MS = 14 * ONE_DAY_MS;
const THTY_DAYS_MS = 30 * ONE_DAY_MS;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractTitleFromMessage(message: string) {
  if (message.includes("review codegate")) {
    console.log("message is");
    console.log(JSON.stringify(message, null, 2));
  }
  try {
    const regex = /^(.*)```[\s\S]*?```(.*)$/s;
    const match = message.match(regex);

    if (match) {
      const beforeMarkdown = match[1].trim();
      const afterMarkdown = match[2].trim();
      const title = beforeMarkdown || afterMarkdown;
      return title;
    }

    return message.trim();
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

export function groupPromptsByRelativeDate(prompts: Prompt[]) {
  const promptsSorted = prompts.sort(
    (a, b) =>
      new Date(b.conversation_timestamp).getTime() -
      new Date(a.conversation_timestamp).getTime()
  );

  const grouped = promptsSorted.reduce((groups, prompt) => {
    const promptDate = new Date(prompt.conversation_timestamp);
    const now = new Date();
    const differenceInMs = now.getTime() - promptDate.getTime();
    const group = getGroup(differenceInMs, promptDate);

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(prompt);
    return groups;
  }, {} as Record<string, Prompt[]>);

  return grouped;
}

export function getAllIssues(alerts: Alert[]) {
  const groupedTriggerCounts = alerts.reduce<Record<string, number>>(
    (acc, alert) => {
      const triggerType = alert.trigger_type;
      if (triggerType) {
        acc[triggerType] = (acc[triggerType] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const maxCount = Math.max(...Object.values(groupedTriggerCounts));

  const sortedTagCounts = Object.entries(groupedTriggerCounts).sort(
    ([, countA], [, countB]) => countB - countA
  );
  return { maxCount, sortedTagCounts };
}

export function getMaliciousPackages() {
  const packageCounts = ([] as { packages: [] }[]).reduce<
    Record<string, number>
  >((acc, prompt) => {
    (prompt?.packages ?? []).forEach((pkg) => {
      acc[pkg] = (acc[pkg] || 0) + 1;
    });
    return acc;
  }, {});

  const chartData = Object.entries(packageCounts).map(([pkg, count]) => ({
    id: pkg,
    label: pkg,
    value: count,
  }));

  return chartData;
}

export function sanitizeQuestionPrompt({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  try {
    // Check if 'answer' is truthy; if so, try to find and return the text after "Query:"
    if (answer) {
      const index = question.indexOf("Query:");
      if (index !== -1) {
        // Return the substring starting right after the first occurrence of "Query:"
        // Adding the length of "Query:" to the index to start after it
        return question.substring(index + "Query:".length).trim();
      } else {
        // If there is no "Query:" in the string, log the condition and return an empty string
        console.log("No 'Query:' found in the question.");
        return "";
      }
    } else {
      // If 'answer' is not provided or falsy, return the original question
      return question;
    }
  } catch (error) {
    // Log the error and return the original question as a fallback
    console.error("Error processing the question:", error);
    return question;
  }
}
