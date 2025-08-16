import { PrismaClient } from "@/lib/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// This is a hack to make sure we don't create multiple instances of PrismaClient
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
