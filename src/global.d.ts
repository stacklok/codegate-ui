export interface AppConfig {
  DASHBOARD_API_BASE_URL?: string
}

declare global {
  interface Window {
    APP_CONFIG: AppConfig
  }
}

export {}
