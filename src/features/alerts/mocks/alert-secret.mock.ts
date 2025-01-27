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
          message:
            'The `.env` file you provided contains environment variable definitions that are typically used in applications to configure settings without hardcoding them into the source code. Here\'s a breakdown of each line in the file:\n\n1. **`AUTH_KEYCLOAK_ID="minder-frontend"`**:\n   - This variable likely represents the identifier for the Keycloak client used for authentication. It specifies which client (in this case, `minder-frontend`) is being used to authenticate users.\n\n2. **`AUTH_KEYCLOAK_ISSUER="https://auth.sandbox.stacklok.dev/realms/stacklok"`**:\n   - This variable specifies the URL of the Keycloak issuer. It points to the Keycloak server\'s realm where the authentication takes place. This URL is used to validate tokens and manage user sessions.\n\n3. **`AUTH_SECRET="minder-ui-secret"`**:\n   - This variable holds a secret key used for signing or encrypting tokens. It is crucial for maintaining the security of the authentication process. This secret should be kept confidential and not exposed in public repositories.\n\n4. **`NEXT_PUBLIC_API_URL="https://api.sandbox.stacklok.dev"`**:\n   - This variable defines the base URL for the API that the frontend application will interact with. The `NEXT_PUBLIC_` prefix indicates that this variable is accessible in the client-side code, which is typical in Next.js applications.\n\n5. **`NEXT_PUBLIC_BASE_URL="https://cloud.stacklok.com"`**:\n   - Similar to the previous variable, this defines the base URL for the application. It may be used for routing or linking to different parts of the application.\n\n6. **`NEXT_PUBLIC_INSIGHT_API_URL=https://trusty.stacklok.dev`**:\n   - This variable specifies another API endpoint that the application may use. It is also prefixed with `NEXT_PUBLIC_`, indicating that it is accessible in the client-side code. Note that this variable does not have quotes around the URL, which is acceptable in `.env` files but may lead to inconsistencies if other variables are quoted.\n\n### Summary:\n- The `.env` file is used to store configuration settings for the application, particularly related to authentication and API endpoints.\n- The use of `NEXT_PUBLIC_` indicates that these variables are intended to be exposed to the client-side code in a Next.js application.\n- It is important to ensure that sensitive information, such as `AUTH_SECRET`, is kept secure and not exposed in public repositories or client-side code.\n- Consistency in quoting values is recommended for clarity and to avoid potential issues.',
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
    "Amazon - Secret Access Key:\n    steps:\n      - name: Checkout Repository\n        uses: REDACTED<$BeldxVmNty++LTH/0/z3/S2sJZVvZC16b/S4On/cKkTuT6p7ygAa+NQkVQ/Yrf8pIV4Aat0L7GaEXuOWN0ITKrq7b0+YfBhNaunpOX0n5ACs+drUjmuj4Vi9uNkbxlNl> # v4\n\n      - name: Setup\n        uses: ./.github/actions/setup",
  trigger_type: "codegate-secrets",
  trigger_category: "critical",
  timestamp: "2025-01-13T17:15:06.942856Z",
} satisfies AlertConversation;
