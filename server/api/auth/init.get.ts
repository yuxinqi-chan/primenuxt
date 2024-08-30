export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma;
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return true;
  }
  return false;
});
