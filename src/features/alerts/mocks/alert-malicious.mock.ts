import { AlertConversation, QuestionType } from "@/api/generated";

export const ALERT_MALICIOUS = {
  conversation: {
    question_answers: [
      {
        question: {
          message:
            "Context: invokehttp is a Python package available on PyPI ecosystem.  However, this package is found to be malicious and must not be used. For additional information refer to https://www.insight.stacklok.com/report/pypi/invokehttp - Package offers this functionality: Python HTTP for Humans.\n \n\n Query: Is invokehttp a malicious package?",
          timestamp: "2025-01-14T16:29:49.602403Z",
          message_id: "bf92bf3c-fcec-4064-ad02-c792026c3555",
        },
        answer: {
          message:
            "**Warning:** CodeGate detected one or more malicious, deprecated or archived packages.\n- Pkg 1: [https://www.insight.stacklok.com/report/pypi/invokehttp](https://www.insight.stacklok.com/report/pypi/invokehttp)",
          timestamp: "2025-01-14T16:29:50.213490Z",
          message_id: "7e260699-906e-43dc-a43e-8f288389bd9d",
        },
      },
    ],
    provider: "copilot",
    type: QuestionType.CHAT,
    chat_id: "bf92bf3c-fcec-4064-ad02-c792026c3555",
    conversation_timestamp: "2025-01-14T16:29:49.602403Z",
  },
  alert_id: "bf92bf3c-fcec-4064-ad02-c792026c3555",
  code_snippet: null,
  trigger_string: {
    name: "invokehttp",
    type: "pypi",
    status: "malicious",
    description: "Python HTTP for Humans.",
  },
  trigger_type: "codegate-context-retriever",
  trigger_category: "critical",
  timestamp: "2025-01-14T16:29:49.602403Z",
} satisfies AlertConversation;
