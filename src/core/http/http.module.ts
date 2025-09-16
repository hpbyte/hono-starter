import { Module } from '@core/di'
import { HttpServer } from './http.server'

@Module({
  providers: [HttpServer]
})
export class HttpModule {}
