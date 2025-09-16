import { Injectable } from '@core/di'
import type { HttpController } from '@shared/types/http'
import type { Hono } from 'hono'
import { HealthService } from './health.service'

@Injectable()
export class HealthController implements HttpController {
  constructor(private readonly service: HealthService) {}

  registerRoutes(app: Hono) {
    app.get('/health', async (context) => {
      const status = await this.service.check()
      return context.json(status)
    })
  }
}
