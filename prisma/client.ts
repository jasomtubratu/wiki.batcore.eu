import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["warn", "error"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  edge_prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.edge_prisma ?? prismaClientSingleton();

const EdgePrisma = prisma;

export default EdgePrisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.edge_prisma = prisma;