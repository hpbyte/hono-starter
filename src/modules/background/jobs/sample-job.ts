import { ConfigService } from '@core/config/config.service'
import { Inject, Injectable } from '@core/di'
import type { IBackgroundJob } from '@shared/types'

import { SampleJobHandler } from '../services/sample-job.handler'

@Injectable()
export class SampleJob implements IBackgroundJob {
  readonly id = 'sample-job'

  constructor(
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(SampleJobHandler)
    private readonly handler: SampleJobHandler
  ) {}

  async start() {
    // process job
    return this.handler.handle()
  }

  async stop() {
    //
  }
}
