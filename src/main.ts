import { bootstrap } from './bootstrap'

async function main() {
  let isShuttingDown = false
  const { runtime, server } = await bootstrap()

  server.listen()
  console.log(`[app] http server listening on port ${String(server.port)}`)

  async function shutdown(signal: NodeJS.Signals) {
    if (isShuttingDown) return

    isShuttingDown = true
    console.log(`[app] received ${signal}, shutting down`)

    try {
      await runtime.stop()
    } catch (error) {
      console.error('[app] failed to stop background runtime', error)
    }

    try {
      await server.stop()
    } catch (error) {
      console.error('[app] failed to stop http server', error)
    }
  }

  process.once('SIGINT', (s) => void shutdown(s))
  process.once('SIGTERM', (s) => void shutdown(s))
}

main().catch((error: unknown) => {
  console.error('[app] failed to start', error)
  process.exitCode = 1
})
