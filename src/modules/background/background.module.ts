import { Module } from '@core/di'

import { SampleJob } from './jobs/sample-job'
import { BackgroundRuntime } from './runtime/background.runtime'
import { SampleJobHandler } from './services/sample-job.handler'

@Module({
  providers: [BackgroundRuntime, SampleJobHandler],
  backgroundJobs: [SampleJob]
})
export class BackgroundModule {}
