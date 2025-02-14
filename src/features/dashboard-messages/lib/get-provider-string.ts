export function getProviderString(provider: string | null): string {
  switch (provider) {
    case 'copilot':
      return 'Github Copilot'
    case null:
      return 'Unknown provider'
    default:
      return provider
  }
}
