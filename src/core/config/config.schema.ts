import { z } from 'zod'

export const configSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required')
})

export type AppConfig = z.infer<typeof configSchema>
