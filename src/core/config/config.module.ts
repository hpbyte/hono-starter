import { Module } from '@core/di'

import { ConfigService } from './config.service'

@Module({
  providers: [ConfigService]
})
export class ConfigModule {}
