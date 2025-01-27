import { AlertConversation, QuestionType } from "@/api/generated";

export const ALERT_SECRET = {
  conversation: {
    question_answers: [
      {
        question: {
          message: "Analyse this file please",
          timestamp: "2025-01-13T17:15:06.942856Z",
          message_id: "11ab8b11-0338-4fdb-b329-2184d3e71a14",
        },
        answer: {
          message: "foo-bar",
          timestamp: "2025-01-13T17:15:08.537530Z",
          message_id: "f1a6201f-0d7f-4c93-bb84-525f2a2d0d3b",
        },
      },
    ],
    provider: "copilot",
    type: QuestionType.CHAT,
    chat_id: "11ab8b11-0338-4fdb-b329-2184d3e71a14",
    conversation_timestamp: "2025-01-13T17:15:06.942856Z",
  },
  alert_id: "11ab8b11-0338-4fdb-b329-2184d3e71a14",
  code_snippet: null,
  trigger_string:
    "Amazon - Secret Access Key:\n    steps:\n      - name: Checkout Repository\n        uses: REDACTED<$foo-bar> # v4\n\n      - name: Setup\n        uses: ./.github/actions/setup",
  trigger_type: "codegate-secrets",
  trigger_category: "critical",
  timestamp: "2025-01-13T17:15:06.942856Z",
} satisfies AlertConversation;
