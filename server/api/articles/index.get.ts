import { z } from "zod";

export default defineEventHandler(async (event) => {
  const { tag, orderBy, cursorId } = await getValidatedRouterParams(
    event,
    z.object({
      tag: z.string().min(1).optional(),
      orderBy: z.enum(["asc", "desc"]),
      cursorId: z.number({ coerce: true }).int().positive().optional(),
    }).parse
  );
  const prisma = usePrisma(event);
  const article = await prisma.article.findMany({
    include: {
      articleTags: {
        include: {
          tag: true,
        },
      },
    },
    where: {
      articleTags: tag
        ? {
            some: {
              tag: {
                name: tag,
              },
            },
          }
        : undefined,
    },
    skip: cursorId ? 0 : 1,
    take: 10,
    cursor: { id: cursorId },
    orderBy: {
      id: orderBy,
    },
  });
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return article;
});
