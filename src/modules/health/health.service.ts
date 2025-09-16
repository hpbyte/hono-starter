import { DrizzleClient } from '@core/database/drizzle.client'
import { Inject, Injectable } from '@core/di'

@Injectable()
export class HealthService {
  constructor(@Inject(DrizzleClient) private readonly db: DrizzleClient) {}

  async check() {
    const dbHealthy = await this.db.healthCheck()

    return {
      status: dbHealthy ? 'ok' : 'degraded',
      database: dbHealthy
    }
  }
}
