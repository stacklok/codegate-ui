export interface AppConfig {
  BASE_API_URL?: string
}

declare global {
  interface Window {
    APP_CONFIG: AppConfig
  }
}

export {}
