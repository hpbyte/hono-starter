import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/core/database/drizzle/',
  schema: './src/core/database/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  migrations: {
    table: '__drizzle_migrations__',
    schema: 'public'
  }
})
