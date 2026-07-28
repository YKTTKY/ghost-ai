import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

/**
 * Create a configured PrismaClient instance using the `DATABASE_URL` environment variable.
 *
 * If `DATABASE_URL` begins with `prisma+postgres://`, the returned client is configured with `accelerateUrl` set to that URL.
 * Otherwise the returned client uses a `PrismaPg` adapter backed by a `pg` `Pool` created from `DATABASE_URL`.
 *
 * @returns A `PrismaClient` instance configured to connect to the database according to `DATABASE_URL`.
 */
function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL!

  if (databaseUrl.startsWith('prisma+postgres://')) {
    return new PrismaClient({ accelerateUrl: databaseUrl })
  }

  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
