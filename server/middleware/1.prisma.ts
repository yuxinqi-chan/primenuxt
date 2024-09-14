export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event);
  event.context.prisma = prisma;
});

declare module "h3" {
  interface H3EventContext {
    prisma: ReturnType<typeof usePrisma>;
  }
}
