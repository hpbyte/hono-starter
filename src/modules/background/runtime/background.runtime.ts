import { Injectable, MultiInject, Optional } from '@core/di'
import { TOKENS } from '@core/di/tokens'
import type { IBackgroundJob } from '@shared/types'

@Injectable()
export class BackgroundRuntime {
  private readonly jobs: IBackgroundJob[]
  private isRunning = false

  constructor(
    @MultiInject(TOKENS.BackgroundJob)
    @Optional()
    jobs: IBackgroundJob[] | undefined
  ) {
    this.jobs = jobs ?? []
  }

  async start() {
    if (this.isRunning) return

    for (const job of this.jobs) {
      try {
        await job.start()
        console.log(`[background] job started`, { id: job.id })
      } catch (error) {
        console.error(`[background] failed to start job ${job.id}:`, error)
        await this.stop()
        throw error
      }
    }

    this.isRunning = true
  }

  async stop() {
    if (!this.isRunning) return

    for (const job of [...this.jobs].reverse()) {
      try {
        await job.stop()
        console.log(`[background] job stopped`, { id: job.id })
      } catch (error) {
        console.error(`[background] failed to stop job ${job.id}:`, error)
      }
    }

    this.isRunning = false
  }
}
