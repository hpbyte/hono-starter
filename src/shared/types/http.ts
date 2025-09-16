import type { Hono } from 'hono'

export interface HttpController {
  registerRoutes(app: Hono): void
}
