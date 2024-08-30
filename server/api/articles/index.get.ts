import { z } from "zod";
export default defineEventHandler(async (event) => {
  const { tag, sort, cursorId, size, page } = await getValidatedQuery(
    event,
    z.object({
      tag: z.string().min(1).optional(),
      sort: z.enum(["asc", "desc"]).default("asc"),
      cursorId: z.number({ coerce: true }).int().positive().optional(),
      page: z.number({ coerce: true }).int().positive().optional(),
      size: z.number({ coerce: true }).int().positive().default(10),
    }).parse
  );
  const prisma = usePrisma(event);
  const articles = await prisma.article.findMany({
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
    skip: cursorId ? 1 : page ? (page - 1) * size : 0,
    take: size,
    cursor: cursorId ? { id: cursorId } : undefined,
    orderBy: {
      id: sort,
    },
  });
  if (!articles) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found",
    });
  }
  return articles;
});
