import { PrismaClient } from "../app/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";

function makePrismaClient() {
  const url = process.env.DATABASE_URL ?? "";

  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url }).$extends(withAccelerate());
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = (
  globalForPrisma.prisma ?? makePrismaClient()
) as unknown as PrismaClient;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
