import { Injectable } from '@core/di'
import { configSchema } from './config.schema'
import type { AppConfig } from './config.schema'

@Injectable()
export class ConfigService {
  private readonly config: AppConfig

  constructor() {
    const envSource = typeof Bun !== 'undefined' ? Bun.env : process.env
    const rawEnv = Object.fromEntries(Object.entries(envSource)) as Record<
      string,
      string | undefined
    >
    const result = configSchema.safeParse(rawEnv)

    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `${issue.path.join('.') || 'config'}: ${issue.message}`)
        .join('; ')
      throw new Error(`Invalid configuration: ${details}`)
    }

    this.config = result.data
  }

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key]
  }

  all(): AppConfig {
    return this.config
  }
}
