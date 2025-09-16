import { ConfigService } from '@core/config/config.service'
import { Inject, Injectable, MultiInject, Optional } from '@core/di'
import { TOKENS } from '@core/di/tokens'
import type { HttpController } from '@shared/types/http'
import type { Server } from 'bun'
import { Hono } from 'hono'

@Injectable()
export class HttpServer {
  public readonly port: number
  private readonly app: Hono = new Hono()
  private server: Server | undefined

  constructor(
    @Inject(ConfigService) private readonly config: ConfigService,
    @MultiInject(TOKENS.HttpController)
    @Optional()
    private readonly controllers: HttpController[] = []
  ) {
    this.port = this.config.get('PORT')
  }

  public build(): Hono {
    for (const controller of this.controllers) {
      controller.registerRoutes(this.app)
    }

    return this.app
  }

  public listen() {
    if (!this.server) {
      this.build()
      this.server = Bun.serve({
        fetch: this.app.fetch,
        port: this.port
      })
    }

    return this.server
  }

  public async stop(closeActiveConnections = false) {
    if (!this.server) return

    const server = this.server
    this.server = undefined

    await server.stop(closeActiveConnections)
  }
}
