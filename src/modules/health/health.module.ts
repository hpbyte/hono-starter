import { Module } from '@core/di'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

@Module({
  providers: [HealthService],
  controllers: [HealthController]
})
export class HealthModule {}
