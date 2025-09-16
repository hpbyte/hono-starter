import { DrizzleClient } from '@core/database/drizzle.client'
import { Injectable } from '@core/di'

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleClient) {}

  async getUsers() {
    return await this.drizzle.database.query.users.findMany()
  }
}
