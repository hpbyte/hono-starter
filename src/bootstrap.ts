import 'reflect-metadata'

import { ConfigModule } from '@core/config/config.module'
import { DatabaseModule } from '@core/database/database.module'
import { createContainer } from '@core/di/container'
import { HttpModule } from '@core/http/http.module'
import { HttpServer } from '@core/http/http.server'
import { BackgroundModule } from '@modules/background/background.module'
import { BackgroundRuntime } from '@modules/background/runtime/background.runtime'
import { HealthModule } from '@modules/health/health.module'
import { UserModule } from '@modules/user/user.module'
import { SharedModules } from '@shared/shared.module'

export async function bootstrap() {
  const modules = [
    // core modules
    ConfigModule,
    DatabaseModule,
    HttpModule,

    // features
    BackgroundModule,
    HealthModule,
    UserModule,

    // shared modules
    SharedModules
  ]

  const container = createContainer(modules)

  const runtime = container.get(BackgroundRuntime)
  await runtime.start()

  const server = container.get(HttpServer)

  return { runtime, server }
}
