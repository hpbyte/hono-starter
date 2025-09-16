import { Module } from '@core/di'

import { DrizzleClient } from './drizzle.client'

@Module({
  providers: [DrizzleClient]
})
export class DatabaseModule {}
