export interface IBackgroundJob {
  readonly id: string
  start(): Promise<void>
  stop(): Promise<void>
}
