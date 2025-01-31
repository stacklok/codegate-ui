export const emptyStateStrings = {
  title: {
    loading: "Loading...",
    getStarted: "Get started with CodeGate",
    noAlertsFound: "No alerts found",
    noAlertsFoundWorkspace: "This workspace hasn't triggered any alerts",
    noLeakedSecretsDetected: "No leaked secrets detected",
    noMaliciousPackagesDetected: "No malicious packages detected",
    noSearchResultsFor: (x: string | undefined): string =>
      !x ? "No search results" : `No search results for "${x}"`,
  },
  body: {
    loading: "Checking for the latest alerts.",
    getStartedDesc: "Learn how to get started with CodeGate in your IDE.",
    tryChangingSearch: "Try changing your search query or clearing the search.",
    alertsWillShowUpWhenWorkspace:
      "Alerts will show up here when they are detected for this workspace.",
    alertsDesc:
      "Alerts are issues that CodeGate has detected and mitigated in your interactions with the LLM.",
    secretsDesc:
      "CodeGate helps you protect sensitive information from being accidentally exposed to AI models and third-party AI provider systems by redacting detected secrets from your prompts using encryption.",
    maliciousDesc:
      "CodeGate's dependency risk insight helps protect your codebase from malicious or vulnerable dependencies. It identifies potentially risky packages and suggests fixed versions or alternative packages to consider.",
  },
} as const;
