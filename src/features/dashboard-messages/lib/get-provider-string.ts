export function getProviderString(provider: string | null): string {
  switch (provider) {
    case "copilot":
      return "Github Copilot";
    case null:
      return "N/A";
    default:
      return provider;
  }
}
