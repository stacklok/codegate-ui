export const emptyStateStrings = {
  title: {
    loading: "Loading...",
    getStarted: "Get started with CodeGate",
    noMessages: "No messages found",
    noMessagesWorkspace: "This workspace hasn't recorded any messages yet.",
    anErrorOccurred: "An error occurred",
    noLeakedSecretsDetected: "No leaked secrets detected",
    noMaliciousPackagesDetected: "No malicious packages detected",
    noSearchResultsFor: (x: string | undefined): string =>
      !x ? "No search results" : `No search results for "${x}"`,
  },
  body: {
    loading: "Checking for the latest messages.",
    errorDesc:
      "Please try refreshing the page. If this issue persists, please let us know on Discord, or open a a new Github Issue",
    getStartedDesc: "Learn how to get started with CodeGate in your IDE.",
    tryChangingSearch: "Try changing your search query or clearing the search.",
    messagesWillShowUpWhenWorkspace:
      "Messages will show up here when they are detected for this workspace.",
    messagesDesc:
      "Messages are issues that CodeGate has detected and mitigated in your interactions with the LLM.",
    secretsDesc:
      "CodeGate helps you protect sensitive information from being accidentally exposed to AI models and third-party AI provider systems by redacting detected secrets from your prompts using encryption.",
    maliciousDesc:
      "CodeGate's dependency risk insight helps protect your codebase from malicious or vulnerable dependencies. It identifies potentially risky packages and suggests fixed versions or alternative packages to consider.",
  },
} as const;
