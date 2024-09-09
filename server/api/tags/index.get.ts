export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event);
  const tags = await prisma.tag.findMany({
    where: {
      articles: {
        some: {},
      },
    },
    include: {
      _count: {
        select: { articles: true },
      },
    },
  });
  return tags;
});
