import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { H3Event } from "h3";

export const usePrisma = (event: H3Event) => {
  const env = event.context.cloudflare.env;
  const adapter = new PrismaD1(env.DB);
  const prisma = new PrismaClient({ adapter });
  return prisma;
};
