export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event);
  const tags = await prisma.tag.findMany();
  return tags;
});
