import { ConfigService } from '@core/config/config.service'
import { Inject, Injectable } from '@core/di'
import { drizzle } from 'drizzle-orm/node-postgres'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

@Injectable()
export class DrizzleClient {
  private readonly pool: Pool
  private readonly db: NodePgDatabase<typeof schema>

  constructor(@Inject(ConfigService) config: ConfigService) {
    const connectionString = config.get('DATABASE_URL')
    this.pool = new Pool({ connectionString })
    this.db = drizzle(this.pool, { schema })
  }

  get database(): NodePgDatabase<typeof schema> {
    return this.db
  }

  async healthCheck() {
    try {
      await this.pool.query('select 1')
      return true
    } catch (error) {
      console.error('Drizzle health check failed', error)
      return false
    }
  }

  async dispose() {
    await this.pool.end()
  }
}
